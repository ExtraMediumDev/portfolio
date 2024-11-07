import React, { useMemo, useRef, useEffect, useState} from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { OrbitControls, useHelper } from '@react-three/drei'
import * as THREE from 'three'

import * as dat from 'dat.gui'
const gui = new dat.GUI();
gui.domElement.id = "gui";

import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  Clock,
  Vector2,
  Vector3,
  TextureLoader
} from 'three';

import { Agents } from './Agents.jsx';
import { Hunter } from './Hunter.jsx';

import Stats from 'stats.js';
const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

import { DirectionalLightHelper } from 'three';

extend({ EffectComposer, RenderPass, UnrealBloomPass });

function RotatingCube() {
  const meshRef = useRef();

  // Rotate the cube on every frame
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}


function PostProcessing() {
  const { gl, scene, camera, size } = useThree();
  const composerRef = useRef();

  // Set up post-processing
  useEffect(() => {
    const composer = new EffectComposer(gl);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(size.width, size.height), 1.5, 0.4, 0.85);
    composer.addPass(bloomPass);
    composerRef.current = composer;
  }, [gl, scene, camera, size]);

  // Render with post-processing on every frame
  useFrame(() => composerRef.current && composerRef.current.render(), 1);

  return null;
}


function DirectionalLightWithHelper() {
  const lightRef = useRef();

  // Use helper to visualize the light source
  useHelper(lightRef, DirectionalLightHelper, 0.5);

  return <directionalLight ref={lightRef} position={[0, 1, -1]} intensity={3} />;
}

function AgentsComponent( {hunter, onAgentsInit} ) {
  const agentsRef = useRef();

  useEffect(() => {
    if (!hunter) return; // Guard against null hunter

    const agents = new Agents(2000);
    agentsRef.current = agents;
    agents.setHunter(hunter);

    if (onAgentsInit) {
      onAgentsInit(agents)
    }

    // Set up GUI for agents
    const gui = new dat.GUI();
    const firingFolder = gui.addFolder('Firing');
    firingFolder.add(agents, 'FIRE_CYCLE', 0.5, 5).step(0.1).name('Cycle');
    firingFolder.add(agents, 'NUDGE_FACTOR', 0, 0.03).step(0.003).name('Nudging');
    firingFolder.add(agents.uniforms.fireR2, 'value', 0, 0.006).step(0.0005).name('Body fire');
    firingFolder.add(agents.uniforms.fireR1, 'value', 0, 0.06).step(0.005).name('Diffused fire');
    firingFolder.add({ desync: () => agents.desynchronize() }, 'desync').name('Desynchronize');

    const flockingFolder = gui.addFolder('Flocking');
    flockingFolder.add(agents, 'DESIRED_SPEED', 0, 0.4).step(0.05).name('Speed');
    flockingFolder.add(agents, 'COHERE_FACTOR', 0, 10).step(0.1).name('Coherence');
    flockingFolder.add(agents, 'ALIGN_FACTOR', 0, 0.2).step(0.01).name('Alignment');
    flockingFolder.add(agents, 'AVOID_FACTOR', 0, 50).step(1).name('Avoidance');

    return () => gui.destroy();
  }, [hunter]);

  useFrame((state, delta) => {
    if (agentsRef.current) {
      agentsRef.current.tick(delta);
    }
  });

  return agentsRef.current ? <primitive object={agentsRef.current.mesh} /> : null;
}

function HunterComponent({ onHunterInit }) {
  const hunterRef = useRef();

    useEffect(() => {
        const hunter = new Hunter();
        hunterRef.current = hunter;

        if (onHunterInit) {
          onHunterInit(hunter);
        }

        // Set up GUI for hunter
        const gui = new dat.GUI();
        const hunterFolder = gui.addFolder('Hunter');
        hunterFolder.add(hunter, 'enable').name('Enable');
        hunterFolder.add(hunter, 'CHASE_FACTOR', 0, 0.8).step(0.1).name('Chasing');

        return () => {
            gui.destroy();
        };
    }, []); // Ensure this only runs once

    useFrame((_, delta) => {
        if (hunterRef.current) {
            hunterRef.current.tick(delta);
        }
    });

    return hunterRef.current ? <primitive object={hunterRef.current.mesh} /> : null;
}

function StatsComponent() {
  const stats = useRef(new Stats());

  useEffect(() => {
    document.body.appendChild(stats.current.dom);
    return () => document.body.removeChild(stats.current.dom);
  }, []);

  useFrame(() => stats.current.update());

  return null;
}


export default function Scene3D() {

  const [hunter, setHunter] = useState(null);
  const [agents, setAgents] = useState(null)

  const handleHunterInit = (initializedHunter) => {
    setHunter(initializedHunter);
  };

  const handleAgentsInit = (initializedAgents) => {
    setAgents(initializedAgents)
  }

  return (
    <Canvas camera={{ position: [3, 3, 3] }}>
      <color attach="background" args={['black']} />
      <ambientLight intensity={0.4} />
      <DirectionalLightWithHelper />
      <RotatingCube />
      <OrbitControls />
      <PostProcessing />
      <StatsComponent />
      <HunterComponent onHunterInit={handleHunterInit} />
      {hunter && <AgentsComponent hunter={hunter} onAgentsInit={handleAgentsInit}  />}
    </Canvas>
  );
}
