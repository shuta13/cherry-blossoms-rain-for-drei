import { Canvas, useFrame } from '@react-three/fiber';
import type { NextPage } from 'next';
import { useRef, useState } from 'react';
import type { Mesh } from 'three';

type BoxProps = {
  position: number[];
};

const Box: React.FC<BoxProps> = (props) => {
  const mesh = useRef<Mesh>(null!);

  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01));

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={() => setActive((prevState) => !prevState)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hover ? 'hotpink' : 'orange'} />
    </mesh>
  );
};

const Home: NextPage = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  );
};

export default Home;
