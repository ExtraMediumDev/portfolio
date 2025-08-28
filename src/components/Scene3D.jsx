// src/components/Scene3D.jsx
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function SpinningCube() {
  const ref = useRef();
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x += 0.15 * dt;
    ref.current.rotation.y += 0.25 * dt;
  });

  return (
    <mesh ref={ref} scale={[1.8, 1.8, 1.8]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#d1d5db"   // light gray
        roughness={0.9}   // matte surface
        metalness={0}     // no metallic reflection
      />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
      className="h-full w-full"
    >
      {/* light site background */}
      <color attach="background" args={["#f7f7f9"]} />

      {/* dim ambient to allow strong contrast */}
      <ambientLight intensity={0.5} />

      {/* strong key light from top-right */}
      <directionalLight position={[3, 3, 5]} intensity={1.4} />

      {/* optional faint fill from left so it's not fully black */}
      <directionalLight position={[-4, -2, -3]} intensity={0.15} />

      <SpinningCube />
    </Canvas>
  );
}
