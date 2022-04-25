import { shaderMaterial } from '@react-three/drei';
import { extend, Object3DNode, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import vertex from './shaders/shader.vert';
import fragment from './shaders/shader.frag';
import { useRef } from 'react';
import { ShaderMaterial } from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      colorShiftMaterial: Object3DNode<
        THREE.ShaderMaterial,
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

export const Grad = () => {
  const material = useRef<ShaderMaterial>(null!);

  useFrame((_, delta) => {
    material.current.uniforms.time.value =
      Math.sin(delta / 2) * Math.cos(delta / 2);
  });

  return (
    <colorShiftMaterial
      key={THREE.MathUtils.generateUUID()}
      ref={material}
      // @ts-expect-error
      time={3}
    />
  );
};
