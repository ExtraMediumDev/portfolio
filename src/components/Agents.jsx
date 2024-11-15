import * as THREE from 'three';
import {
    BufferAttribute,
    BufferGeometry, Color,
    DynamicDrawUsage, AdditiveBlending,
    Points,
    ShaderMaterial, 
    Vector3,
} from 'three';
import {UnitGrid} from "./Grid.jsx";
import {pointInSphere} from "./pointInSphere.jsx";

const vertexShader = `
    uniform float size;
    attribute float clock;
    attribute float isFleeing;  // Attribute for per-vertex fleeing data
    varying float vClock;
    varying float vIsFleeing;   // Pass isFleeing to the fragment shader

    void main() {
        vClock = clock;
        vIsFleeing = isFleeing;  // Assign the attribute value to the varying
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
    }
`;

const fragmentShader = `
    uniform vec3 bodyColor;    // Regular color
    uniform vec3 fleeColor;    // Bright fleeing color (orange-red)
    uniform float bodyOpacity;
    varying float vClock;
    varying float vIsFleeing;

    void main() {
        float mixFactor = smoothstep(0.0, 1.0, vClock);
        vec3 baseColor = mix(vec3(0.0, 0.7, 1.5), vec3(2.0, 2.0, 0.0), mixFactor); // Blue to Yellow
        baseColor = mix(baseColor, vec3(0.0, 1.5, 0.6), mixFactor * 0.7); // Transition to Green
        
        // Mix baseColor with fleeColor when fleeing
        vec3 color = mix(baseColor, fleeColor * 1.5, vIsFleeing);  // Double fleeColor intensity

        // Stronger glow effect if agent is fleeing
        float dist = length(gl_PointCoord - vec2(0.5));
        float alpha = (1.0 - smoothstep(0.25, 0.5, dist)) * (vIsFleeing * 4.0 + 1.0); // Triple alpha for fleeing agents

        gl_FragColor = vec4(color, alpha * bodyOpacity);
    }
`;

let posVec = new Vector3;
let velVec = new Vector3;
let frcVec = new Vector3;
let quickVec1 = new Vector3;
let quickVec2 = new Vector3;

class Agents{
    constructor(count) {
        this.DESIRED_SPEED = 0.2;  // restores this speed with time
        this.TAU_SPEED = 0.01;     // how quick to restore the desired speed

        this.FIRE_CYCLE = 3;     // how often to fire, s
        this.NUDGE_FACTOR = 0.02;
        this.NUDGE_LIMIT = 3;           // max number of times an agent can nudge its clock per frame
        this.CONFUSION_FACTOR = 0.2;   // confuse the clock when fleeing

        this.VISIBLE_RADIUS = 0.15;   // align and cohere with other agents in this range
        this.PROTECTED_RADIUS = 0.05; // avoid other agents in this range
        this.FLEE_RADIUS = 0.60;       // flee from hunter in this range
        this.HABITAT_RADIUS = 1.6;    // gets pushed back if outside of habitat
        this.USE_GRID = true;

        this.ALIGN_FACTOR = 0.1;
        this.COHERE_FACTOR = 10;
        this.AVOID_FACTOR = 30;
        this.FLEE_FACTOR = 3;  // flee from hunter
        this.HABITAT_FACTOR = 0.1;

        this.hunterPos = new Vector3;   // remembers hunter's position
        this.fleeing = [];              // agents that have to flee

        this.count = count;
        this.posArray  = new Float32Array(count*3);
        this.velArray  = new Float32Array(count*3);
        this.frcArray  = new Float32Array(count*3);
        this.clockArray = new Float32Array(count);
        this.nudgedArray = new Float32Array(count); // how many times was nudged at the last frame
        this.grid = new UnitGrid(); // grid to find neighbors and distances
        
        const partitionSize = Math.max(10, Math.floor(2 / this.VISIBLE_RADIUS));
        this.grid.rebuild(partitionSize);
        

        // Populate the sphere with Agents with random pos and vel
        for (let ID = 0; ID < this.count; ID++){
            pointInSphere(this.HABITAT = 1.8).toArray(this.posArray, ID*3);
            pointInSphere().normalize().multiplyScalar(this.DESIRED_SPEED/5).toArray(this.velArray,ID*3); // random vel
            this.clockArray[ID] = Math.random()*this.FIRE_CYCLE; // initialize clock with a random value
        }

        //Shaders
        this.uniforms = {
            fireCycle: { value: this.FIRE_CYCLE },
            size: { value: 0.04  * window.devicePixelRatio }, // Increase for larger particles
            bodyColor: { value: new Color(0x70ffa1) },
            fleeColor: { value: new THREE.Color(0xff4500) },
            fireColor: { value: new Color(0xff747b) },
            bodyOpacity: { value: 0.8 }, // Increase opacity for better visibility
            fireR1: { value: 0.015 },
            fireR2: { value: 0.0015 },
            aspect: { value: 1.0 }
        }
        let shaderMaterial =  new ShaderMaterial({
            uniforms: this.uniforms,
            fragmentShader,
            vertexShader,
            vertexColors: true,
            blending: AdditiveBlending,
            transparent: true,
            depthTest: false,
        })
        // Set up graphics
        this.geometry = new BufferGeometry();
        this.positionAttribute  = new BufferAttribute(this.posArray, 3).setUsage( DynamicDrawUsage );
        this.geometry.setAttribute('position', this.positionAttribute );
        this.clockAttribute = new BufferAttribute(this.clockArray,1).setUsage( DynamicDrawUsage );
        this.geometry.setAttribute('clock', this.clockAttribute );
        this.mesh = new Points(this.geometry, shaderMaterial);

        this.isFleeingArray = new Float32Array(count);
        this.isFleeingAttribute = new BufferAttribute(this.isFleeingArray, 1).setUsage(DynamicDrawUsage);
        this.geometry.setAttribute('isFleeing', this.isFleeingAttribute);

    
    }

    tick(delta){
        // Find neighbors within the visible radius
        let neighborsPerID = this.grid.getDistancesSq(this.posArray, this.VISIBLE_RADIUS, this.USE_GRID);
        // Communication with the hunter
        this.checkForHunter(this.hunter);
        // Calculate and write down forces
        for (let ID = 0; ID < this.count; ID++) {
            this.fire(ID, delta, neighborsPerID);

            frcVec.set(0, 0, 0);
            frcVec.addScaledVector(this.boidAlgorithm(ID, this.velArray, this.VISIBLE_RADIUS,  neighborsPerID),   this.ALIGN_FACTOR);
            frcVec.addScaledVector(this.boidAlgorithm(ID, this.posArray, this.VISIBLE_RADIUS,  neighborsPerID),   this.COHERE_FACTOR);
            frcVec.addScaledVector(this.boidAlgorithm(ID, this.posArray, this.PROTECTED_RADIUS,neighborsPerID),  -this.AVOID_FACTOR);
            frcVec.addScaledVector(this.flee(ID), -this.FLEE_FACTOR); // Flee from Hunter
            frcVec.addScaledVector(this.constrainToSphere(ID, this.HABITAT_RADIUS), this.HABITAT_FACTOR);
            frcVec.addScaledVector(this.restoreVelocity(ID), delta/this.TAU_SPEED); // Exponentially restore velocity
            frcVec.toArray(this.frcArray, ID*3); // Write down computed force

            this.isFleeingArray[ID] = this.fleeing.includes(ID) ? 1.0 : 0.0;
        }
        // Update velocity and position based on forces
        for (let ID = 0; ID < this.count; ID++){
            this.nudge(ID);
            posVec.fromArray(this.posArray, ID*3);
            velVec.fromArray(this.velArray, ID*3);
            frcVec.fromArray(this.frcArray, ID*3);

            velVec.addScaledVector(frcVec, delta);
            posVec.addScaledVector(velVec, delta);

            velVec.toArray(this.velArray, ID*3);
            posVec.toArray(this.posArray, ID*3);
        }
        //console.log(this.nudgedArray.reduce((xs, x) => xs+x)/this.nudgedArray.length);
        // Update mesh
        this.mesh.geometry.attributes.position.needsUpdate = true;
        this.mesh.geometry.attributes.clock.needsUpdate = true;
    }
    fire(ID, delta, neighborsPerID){
        this.clockArray[ID] += delta;
        if (this.clockArray[ID] > this.FIRE_CYCLE){
            this.clockArray[ID] =  this.clockArray[ID] % this.FIRE_CYCLE;
            for (let [ID2, distSq] of neighborsPerID[ID]) {
                this.nudgedArray[ID2] += 1;
            }
            }
    }
    nudge(ID){
        let amplitude = Math.min(this.nudgedArray[ID],  this.NUDGE_LIMIT)*this.NUDGE_FACTOR;
        let phase = 2*Math.PI*(this.FIRE_CYCLE - this.clockArray[ID])/this.FIRE_CYCLE;
        this.clockArray[ID] += Math.sin(phase)*amplitude;
        this.nudgedArray[ID] = 0;
    }
    /**
     * Versatile function to compute alignment, coherence and avoidance between agents
     * @param ID agent's ID number
     * @param propArray array of agent's positions posArray or velocities velArray
     * @param threshold distance threshold
     * @param neighborsPerID array of maps containing neighbors' IDs and distances calculated by the grid
     */
    boidAlgorithm(ID, propArray, threshold, neighborsPerID){
        let thresholdSq = threshold*threshold;
        quickVec1.set(0, 0, 0); // Force
        let count = 0;
        for (let [ID2, distSq] of neighborsPerID[ID]) {
            if (distSq < thresholdSq) {
                quickVec2.fromArray(propArray, ID2 * 3); // neighbor's property
                quickVec1.add(quickVec2);
                count++;
            }
        }
        if (count > 0){
            quickVec2.fromArray(propArray, ID * 3);    // own property
            quickVec1.addScaledVector(quickVec2, -count);
            quickVec1.multiplyScalar(1/count);
        }
        return quickVec1;
    }
    /**
     * Check hunter's position, give chased agents to the hunter and determine which agents have to flee
     * @param hunter Hunter object
     */
    checkForHunter(hunter) {
        this.fleeing = [];
        if (hunter.enable) {
            this.hunterPos = hunter.getPos();  // Track hunter's position
            let chased = this.grid.findNear(this.hunterPos, this.posArray, hunter.CHASE_RADIUS);
            let thresholdSq = this.FLEE_RADIUS * this.FLEE_RADIUS;
            
            for (let [ID, distSq] of chased) {
                if (distSq < thresholdSq) {
                    this.fleeing.push(ID);
                    this.isFleeingArray[ID] = 1.0;  // Mark as fleeing
                } else {
                    this.isFleeingArray[ID] = 0.0;  // Not fleeing
                }
            }
        } else {
            // Reset fleeing status if the hunter is disabled
            this.isFleeingArray.fill(0.0);
        }
        this.mesh.geometry.attributes.isFleeing.needsUpdate = true;
    }
    
    flee(ID){
        quickVec1.set(0, 0, 0);
        if (this.fleeing.includes(ID)) {
            this.clockArray[ID] -= this.FIRE_CYCLE*this.CONFUSION_FACTOR*Math.random();
            this.clockArray[ID] = Math.max(0, this.clockArray[ID]);

            quickVec1.fromArray(this.posArray, ID * 3); // agent's position
            quickVec1.addScaledVector(this.hunterPos, -1); // direction away from the hunter
            quickVec1.negate(); // negating for consistency with avoiding behavior
        }
        return quickVec1;
    }
    constrainToSphere(ID, radius = 1){
        quickVec1.set(0, 0, 0); // Constraining force
        quickVec2.fromArray(this.posArray, ID*3); //agent's position
        if (quickVec2.lengthSq() > radius*radius){
            return quickVec2.negate();
        }
        return quickVec1;
    }
    restoreVelocity(ID){
        quickVec1.fromArray(this.velArray, ID*3); //agent's velocity
        quickVec1.multiplyScalar((this.DESIRED_SPEED-quickVec1.length()));
        return quickVec1;
    }
    setHunter(hunter){
        this.hunter = hunter;
    }
    desyncronize(){ 
        for (let ID = 0; ID < this.count; ID++){
        this.clockArray[ID] = Math.random()*this.FIRE_CYCLE;
        }
    }
}

export { Agents }