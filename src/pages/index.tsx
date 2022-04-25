import { Grad } from '@/components/canvas/Grad';
import { Frame } from '@/components/Frame';
import { Ground } from '@/components/Ground';
import { Environment } from '@react-three/drei';
import { Canvas, GroupProps, useFrame } from '@react-three/fiber';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Group } from 'three';

const Blossoms = dynamic(() => import('@/components/canvas/Blossoms'), {
  ssr: false,
});

const CONTENTS = [
  // { id: '0', position: [-12, 0, -2], rotation: [0, 0.75, 0], c: <Grad /> },
  { id: '1', position: [0, 0, -6], rotation: [0, 0, 0], c: <Blossoms /> },
  // { id: '2', position: [12, 0, 2], rotation: [0, -0.75, 0], c: <Grad /> },
];

const Frames = () => {
  useEffect(() => {});
  return (
    <group>
      {CONTENTS.map(({ c, ...props }) => (
        // @ts-expect-error
        <Frame key={props.id} {...props}>
          {c}
        </Frame>
      ))}
    </group>
  );
};

const Home: NextPage = () => {
  return (
    <Canvas
      gl={{ alpha: false }}
      dpr={[1, 1.5]}
      camera={{ fov: 70, position: [0, 10, 50] }}
      key={THREE.MathUtils.generateUUID()}
    >
      <color attach="background" args={['#191920']} />
      <fog attach="fog" args={['#191920', 0, 15]} />
      <Environment preset="city" />
      <ambientLight />
      <directionalLight position={[1, 1, 1]} />
      <Ground>
        <Frames />
      </Ground>
    </Canvas>
  );
};

export default Home;
