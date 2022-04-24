import { Grad } from '@/components/canvas/Grad';
import { Frame } from '@/components/Frame';
import { Ground } from '@/components/Ground';
import { Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Canvas
      gl={{ alpha: false }}
      dpr={[1, 1.5]}
      camera={{ fov: 70, position: [0, 2, 15] }}
    >
      <color attach="background" args={['#191920']} />
      <fog attach="fog" args={['#191920', 0, 15]} />
      <Environment preset="city" />
      <ambientLight />
      <directionalLight position={[1, 1, 1]} />
      <Ground>
        {/* <Frame url="IMG_2861.png" position={[-8, 0, 0]} rotation={[0, 1, 0]} /> */}
        <Frame
          url="IMG_2861.png"
          position={[-12, 0, -2]}
          rotation={[0, 0.75, 0]}
        >
          <Grad />
        </Frame>
        <Frame url="IMG_2861.png" position={[0, 0, -6]} rotation={[0, 0, 0]}>
          <Grad />
        </Frame>
        <Frame
          url="IMG_2861.png"
          position={[12, 0, -2]}
          rotation={[0, -0.75, 0]}
        >
          <Grad />
        </Frame>
        {/* <Frame url="IMG_2861.png" position={[8, 0, 0]} rotation={[0, -1, 0]} /> */}
      </Ground>
    </Canvas>
  );
};

export default Home;
