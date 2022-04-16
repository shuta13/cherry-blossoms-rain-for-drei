import { Box } from '@/components/Box';
import { Canvas } from '@react-three/fiber';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Canvas color="#1d1d1d">
      <ambientLight />
      <directionalLight position={[1, 1, 1]} />
      <Box position={[0, 0, 0]} />
    </Canvas>
  );
};

export default Home;
