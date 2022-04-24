import { Euler, useFrame, Vector3 } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import type { Mesh } from 'three';

type FrameProps = {
  position: Vector3;
  rotation: Euler;
  url: string;
  children: React.ReactNode;
};

export const Frame = (props: FrameProps) => {
  const [rnd] = useState(() => Math.random());

  const mesh = useRef<Mesh>(null!);
  const { children } = props;

  const [hovered, setHover] = useState(false);
  useFrame((state, delta) => {
    mesh.current.position.y =
      2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 2) / 6;
    mesh.current.scale.x = THREE.MathUtils.lerp(
      mesh.current.scale.x,
      hovered ? 1 : 0.875,
      0.1
    );
    mesh.current.scale.y = THREE.MathUtils.lerp(
      mesh.current.scale.y,
      hovered ? 1 : 0.905,
      0.1
    );
    // @ts-expect-error
    mesh.current.material.uniforms.time.value +=
      (Math.sin(delta / 2) * Math.cos(delta / 2)) / 4;
  });

  return (
    <group position={[0, 3, 5]} rotation={[0, 0, 0]}>
      <mesh
        {...props}
        ref={mesh}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <planeBufferGeometry args={[12, 8]} />
        {children}
      </mesh>
    </group>
  );
};
