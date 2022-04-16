import { extend, Object3DNode, useFrame, Vector3 } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import type { Mesh, ShaderMaterial } from 'three';
import vertex from './shaders/vertex.glsl';
import fragment from './shaders/fragment.glsl';

type BoxProps = {
  position: Vector3;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      colorShiftMaterial: Object3DNode<
        ShaderMaterial,
        typeof ColorShiftMaterial
      >;
    }
  }
}
const ColorShiftMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.05, 0.0, 0.025),
  },
  vertex,
  fragment
);
extend({ ColorShiftMaterial });

export const Box: React.FC<BoxProps> = (props) => {
  const mesh = useRef<Mesh>(null!);

  const [hover, setHover] = useState(false);
  useFrame((_state, delta) => {
    mesh.current.rotation.x += 0.01;
    // @ts-expect-error
    mesh.current.material.uniforms.time.value +=
      Math.sin(delta / 2) * Math.cos(delta / 2);
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={hover ? 1.1 : 1}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <colorShiftMaterial
        key={THREE.MathUtils.generateUUID()}
        // @ts-expect-error
        time={3}
      />
    </mesh>
  );
};
