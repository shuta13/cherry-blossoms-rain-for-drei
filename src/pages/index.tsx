import { Ground } from '@/components/Ground';
import { Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Canvas
      gl={{ alpha: false }}
      dpr={[1, 1.5]}
      camera={{ fov: 70, position: [0, 2, 14] }}
    >
      <color attach="background" args={['#191920']} />
      <fog attach="fog" args={['#191920', 0, 15]} />
      <Environment preset="city" />
      <ambientLight />
      <directionalLight position={[1, 1, 1]} />
      <Ground />
    </Canvas>
  );
};

export default Home;
