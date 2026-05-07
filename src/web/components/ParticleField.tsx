import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
  const meshRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Blue/cyan/purple palette
      const rand = Math.random();
      if (rand < 0.4) {
        colors[i * 3] = 0; colors[i * 3 + 1] = 0.4; colors[i * 3 + 2] = 1; // blue
      } else if (rand < 0.7) {
        colors[i * 3] = 0; colors[i * 3 + 1] = 0.9; colors[i * 3 + 2] = 1; // cyan
      } else {
        colors[i * 3] = 0.48; colors[i * 3 + 1] = 0.18; colors[i * 3 + 2] = 1; // purple
      }
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function FloatingRing({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
  });
  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[0.8, 0.02, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} />
    </mesh>
  );
}

function FloatingCube({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6 + position[0]) * 0.2;
  });
  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshBasicMaterial color="#0066FF" transparent opacity={0.3} wireframe />
    </mesh>
  );
}

export function ParticleField({ height = "100vh" }: { height?: string }) {
  return (
    <div style={{ position: "absolute", inset: 0, height, pointerEvents: "none" }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ alpha: true, antialias: false }}>
        <Particles />
        <FloatingRing position={[-4, 2, -2]} color="#0066FF" />
        <FloatingRing position={[4, -2, -3]} color="#00E5FF" />
        <FloatingRing position={[2, 3, -4]} color="#7B2FFF" />
        <FloatingCube position={[-3, -1, -1]} />
        <FloatingCube position={[3, 1, -2]} />
        <FloatingCube position={[-1, 2, -3]} />
        <FloatingCube position={[1, -2, -1]} />
      </Canvas>
    </div>
  );
}
