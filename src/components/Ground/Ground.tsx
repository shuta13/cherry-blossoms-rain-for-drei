import { MeshReflectorMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Frame } from '../Frame';

type GroundProps = {
  children: React.ReactNode;
};

export const Ground = (props: GroundProps) => {
  const { children } = props;

  return (
    <group position={[0, -0.5, 0]}>
      {children}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={2}
          mixStrength={40}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#101010"
          metalness={0.5}
          mirror={1}
        />
      </mesh>
    </group>
  );
};
