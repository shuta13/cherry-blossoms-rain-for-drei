import { Euler, useFrame, useThree } from '@react-three/fiber';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useCursor } from '@react-three/drei';

type FrameProps = {
  id: string;
  position: THREE.Vector3;
  rotation: Euler;
  children: React.ReactNode;
};

const GOLDENRATIO = 1.61803398875;

export const Frame = (props: FrameProps) => {
  const [rnd] = useState(() => Math.random());

  const mesh = useRef<THREE.Mesh>(null!);
  const { children, id, ...others } = props;

  const [hovered, setHover] = useState(false);
  useCursor(hovered);

  const [p] = useState(new THREE.Vector3());
  const [q] = useState(new THREE.Quaternion());
  const [clicked, setClick] = useState(false);

  const { viewport } = useThree();

  useFrame((state, delta) => {
    mesh.current.position.y =
      2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 2) / 2;
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

    if (!clicked) {
      const x = state.mouse.x * viewport.width * 0.005;
      const y = state.mouse.y * viewport.height * 0.005;
      // mesh.current.position.set(x, y, 0);
      mesh.current.rotation.x = THREE.MathUtils.lerp(
        mesh.current.rotation.x,
        -y,
        0.1
      );
      mesh.current.rotation.y = THREE.MathUtils.lerp(
        mesh.current.rotation.y,
        x,
        0.1
      );
    }

    state.camera.position.lerp(p, 0.025);
    state.camera.quaternion.slerp(q, 0.025);
  });

  const handleOnClick = useCallback(() => {
    setClick((prevState) => !prevState);
  }, []);
  useEffect(() => {
    if (clicked) {
      mesh.current.updateWorldMatrix(true, true);
      mesh.current.localToWorld(p.set(0, 0, 5));
      mesh.current.getWorldQuaternion(q);
    } else {
      p.set(0, 4, 15.0);
      q.identity();
    }
  }, [clicked, id, p, q]);

  return (
    <group position={[0, 3, 5]} rotation={[0, 0, 0]}>
      <mesh
        {...others}
        name={id}
        ref={mesh}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        onClick={handleOnClick}
      >
        <planeBufferGeometry args={[16, 9]} />
        {children}
      </mesh>
    </group>
  );
};
