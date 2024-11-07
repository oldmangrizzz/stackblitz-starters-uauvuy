import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { MemoryType } from '../lib/HDComputing';

interface Memory {
  id: string;
  position: [number, number, number];
  type: MemoryType;
  metadata: {
    context: string;
  };
}

interface MemoryNodeProps {
  memory: Memory;
  onClick: (memory: Memory) => void;
}

function MemoryNode({ memory, onClick }: MemoryNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const color = {
    [MemoryType.EPISODIC]: '#ff4444',
    [MemoryType.SEMANTIC]: '#44ff44',
    [MemoryType.PROCEDURAL]: '#4444ff',
    [MemoryType.PATTERN]: '#ffff44',
    [MemoryType.QUANTUM]: '#ff44ff',
  }[memory.type];

  return (
    <mesh
      ref={meshRef}
      position={memory.position}
      onClick={() => onClick(memory)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.5 : 1}
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

interface MemoryVisualizerProps {
  memories: Memory[];
  onMemorySelect: (memory: Memory) => void;
}

export function MemoryVisualizer({ memories, onMemorySelect }: MemoryVisualizerProps) {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 0, 20] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars radius={100} depth={50} count={5000} factor={4} />
        <OrbitControls />
        {memories.map((memory) => (
          <MemoryNode
            key={memory.id}
            memory={memory}
            onClick={onMemorySelect}
          />
        ))}
      </Canvas>
    </div>
  );
}