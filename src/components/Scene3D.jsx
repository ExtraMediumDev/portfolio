import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function OrbitingDots() {
  const g1 = useRef(null);
  const g2 = useRef(null);
  const g3 = useRef(null);

  useFrame((_, dt) => {
    if (!g1.current || !g2.current || !g3.current) return;
    g1.current.rotation.y += 0.4 * dt;   // different speeds
    g2.current.rotation.y -= 0.25 * dt;
    g3.current.rotation.y += 0.15 * dt;
  });

  return (
    <group>
      {/* Dot 1 */}
      <group ref={g1} rotation={[0.4, 0, 0]}>
        <mesh position={[2.2, 0, 0]}>
          <sphereGeometry args={[0.06, 24, 24]} />
          <meshStandardMaterial color="#4989e1" roughness={1} metalness={0} />
        </mesh>
      </group>

      {/* Dot 2 */}
      <group ref={g2} rotation={[0.9, 0, 0]}>
        <mesh position={[-1.7, 0, 0]}>
          <sphereGeometry args={[0.05, 24, 24]} />
          <meshStandardMaterial color="#2da868" roughness={1} metalness={0} />
        </mesh>
      </group>

      {/* Dot 3 */}
      <group ref={g3} rotation={[0.2, 0, 0]}>
        <mesh position={[0, 0, 2.0]}>
          <sphereGeometry args={[0.07, 24, 24]} />
          <meshStandardMaterial color="#cf1e1e" roughness={1} metalness={0} />
        </mesh>
      </group>
    </group>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
      className="h-full w-full pointer-events-none"
    >
      {/* match your site background */}
      <color attach="background" args={["#f7f7f9"]} />

      {/* soft lighting so dots are visible but subtle */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 3, 5]} intensity={3} />
      <directionalLight position={[-4, -2, -3]} intensity={0.2} />

      {/* scale a bit so they sit around the text area */}
      <group scale={[1.2, 1.2, 1.2]}>
        <OrbitingDots />
      </group>
    </Canvas>
  );
}
