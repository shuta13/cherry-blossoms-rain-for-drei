import { shaderMaterial } from '@react-three/drei';
import { extend, Object3DNode } from '@react-three/fiber';
import * as THREE from 'three';
import vertex from './shaders/shader.vert';
import fragment from './shaders/shader.frag';

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
  return (
    <colorShiftMaterial
      key={THREE.MathUtils.generateUUID()}
      // @ts-expect-error
      time={3}
    />
  );
};
