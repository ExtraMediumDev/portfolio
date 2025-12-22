import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";

// Custom shader material for soft glowing orbs with position-based dimming
const GlowOrbMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#00aaff"),
  },
  // Vertex shader
  `
    attribute float aSize;
    attribute float aPhase;
    attribute float aDim;
    varying float vPhase;
    varying float vDistance;
    varying float vDim;
    
    void main() {
      vPhase = aPhase;
      vDim = aDim;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vDistance = -mvPosition.z;
      gl_PointSize = aSize * (200.0 / vDistance);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  // Fragment shader - creates soft glowing orb with dimming
  `
    uniform float uTime;
    uniform vec3 uColor;
    varying float vPhase;
    varying float vDistance;
    varying float vDim;
    
    void main() {
      // Create circular shape with soft edges
      vec2 center = gl_PointCoord - vec2(0.5);
      float dist = length(center);
      
      // Soft falloff for glow effect
      float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
      alpha *= alpha; // Quadratic falloff for softer glow
      
      // Pulsing glow - boosted
      float pulse = 0.8 + 0.25 * sin(uTime * 0.5 + vPhase * 6.28);
      
      // Color with slight variation - brighter
      vec3 color = uColor * (1.0 + 0.5 * sin(vPhase * 3.14 + uTime * 0.2));
      
      // Add bright core - more intense
      float core = 1.0 - smoothstep(0.0, 0.18, dist);
      color += vec3(0.7, 0.95, 1.0) * core * 1.3;
      
      // Fade with distance
      float distanceFade = clamp(1.0 - (vDistance - 5.0) / 30.0, 0.2, 1.0);
      
      // Apply position-based dimming (lower-left area dims) - brighter overall
      float finalAlpha = alpha * pulse * distanceFade * vDim * 0.95;
      
      gl_FragColor = vec4(color * 1.15, finalAlpha);
    }
  `
);

extend({ GlowOrbMaterial });

// Simplex noise for fluid movement
const noise3D = (x, y, z, time) => {
  const nx = Math.sin(x * 0.3 + time * 0.1) * Math.cos(z * 0.2 + time * 0.15);
  const ny = Math.sin(y * 0.25 + time * 0.08) * Math.cos(x * 0.15 + time * 0.12);
  const nz = Math.sin(z * 0.2 + time * 0.12) * Math.cos(y * 0.3 + time * 0.1);
  return { x: nx, y: ny, z: nz };
};

const PARTICLE_COUNT = 110;

function FloatingOrbs() {
  const pointsRef = useRef();
  const materialRef = useRef();

  // Initialize particle data
  const { positions, sizes, phases, dims, originalPositions } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const originalPositions = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const phases = new Float32Array(PARTICLE_COUNT);
    const dims = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Spread particles wider with more depth variation
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 4 + Math.random() * 12; // Wider spread radius

      const x = r * Math.sin(phi) * Math.cos(theta) * 1.8; // Wide horizontal
      const y = (Math.random() - 0.5) * 7; // More vertical spread
      const z = r * Math.sin(phi) * Math.sin(theta) * 1.5 + (Math.random() - 0.5) * 8; // More depth

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      sizes[i] = 12 + Math.random() * 22;
      phases[i] = Math.random();
      
      // Calculate dim factor: lower-left area (negative x, negative y) gets dimmed
      // x < -3 and y < -1 = dim zone (where Brian Li title is)
      const dimX = x < -3 ? Math.max(0.1, 1 - Math.abs(x + 3) * 0.15) : 1.0;
      const dimY = y < -1 ? Math.max(0.1, 1 - Math.abs(y + 1) * 0.2) : 1.0;
      dims[i] = Math.min(dimX, dimY);
    }

    return { positions, sizes, phases, dims, originalPositions };
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (materialRef.current) {
      materialRef.current.uTime = time;
    }

    if (pointsRef.current) {
      const posArray = pointsRef.current.geometry.attributes.position.array;
      const dimArray = pointsRef.current.geometry.attributes.aDim.array;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const ox = originalPositions[i * 3];
        const oy = originalPositions[i * 3 + 1];
        const oz = originalPositions[i * 3 + 2];

        const n = noise3D(ox * 0.1, oy * 0.1, oz * 0.1, time * 0.4);

        // More 3D movement - particles drift in depth too
        const depthWave = Math.sin(time * 0.25 + phases[i] * 4) * 2;
        const newX = ox + n.x * 3.5;
        const newY = oy + n.y * 2.5 + Math.sin(time * 0.3 + phases[i] * 6.28) * 0.8;
        const newZ = oz + n.z * 3 + depthWave; // Depth oscillation

        posArray[i * 3] = newX;
        posArray[i * 3 + 1] = newY;
        posArray[i * 3 + 2] = newZ;

        // Update dim factor based on current position
        const dimX = newX < -4 ? Math.max(0.05, 1 - Math.abs(newX + 4) * 0.12) : 1.0;
        const dimY = newY < -1.5 ? Math.max(0.05, 1 - Math.abs(newY + 1.5) * 0.25) : 1.0;
        dimArray[i] = dimX * dimY;
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.geometry.attributes.aDim.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aSize"
          count={PARTICLE_COUNT}
          array={sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aPhase"
          count={PARTICLE_COUNT}
          array={phases}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aDim"
          count={PARTICLE_COUNT}
          array={dims}
          itemSize={1}
        />
      </bufferGeometry>
      <glowOrbMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Soft ambient glow - centered
function AmbientGlow() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.012;
      meshRef.current.material.opacity = 0.018 + Math.sin(state.clock.elapsedTime * 0.2) * 0.006;
    }
  });

  return (
    <mesh ref={meshRef} position={[2, 0.5, -10]}>
      <planeGeometry args={[25, 12]} />
      <meshBasicMaterial
        color="#001833"
        transparent
        opacity={0.02}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// Subtle flowing particles - wider spread with depth
function FlowingDust() {
  const ref = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(120 * 3);
    for (let i = 0; i < 120; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 40; // Very wide
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 25 - 3; // More depth spread
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime;
      const posArray = ref.current.geometry.attributes.position.array;

      for (let i = 0; i < 120; i++) {
        posArray[i * 3 + 1] += Math.sin(time * 0.12 + i) * 0.002;
        posArray[i * 3] += Math.cos(time * 0.1 + i * 0.5) * 0.0015;
        posArray[i * 3 + 2] += Math.sin(time * 0.08 + i * 0.3) * 0.002; // Z movement
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={120}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#335577"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Scene group with more pronounced 3D rotation
function Scene() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      // More noticeable rotation to show 3D depth
      groupRef.current.rotation.y = Math.sin(time * 0.06) * 0.2 + Math.sin(time * 0.02) * 0.1;
      groupRef.current.rotation.x = Math.sin(time * 0.04) * 0.08;
      // Subtle Z rotation for extra depth perception
      groupRef.current.rotation.z = Math.sin(time * 0.03) * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      <FloatingOrbs />
      <FlowingDust />
    </group>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 24], fov: 55 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      }}
      style={{ background: "#0a0a0a" }}
      className="h-full w-full pointer-events-none"
    >
      <color attach="background" args={["#0a0a0a"]} />
      <fog attach="fog" args={["#0a0a0a", 8, 35]} />
      <AmbientGlow />
      <Scene />
    </Canvas>
  );
}
