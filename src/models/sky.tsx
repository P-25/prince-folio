// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
interface SkyProps {
  isRotating: boolean;
}

// 3D Model from: https://sketchfab.com/3d-models/phoenix-bird-844ba0cf144a413ea92c779f18912042
const Sky: React.FC<SkyProps> = ({ isRotating }) => {
  const sky = useGLTF("./assets/sky.glb");
  const skyRef = useRef<Mesh>(null);

  // Note: Animation names can be found on the Sketchfab website where the 3D model is hosted.
  // It ensures smooth animations by making the rotation frame rate-independent.
  // 'delta' represents the time in seconds since the last frame.
  useFrame((_, delta) => {
    if (isRotating) {
      skyRef.current.rotation.y += 0.25 * delta; // Adjust the rotation speed as needed
    }
  });

  return (
    <mesh ref={skyRef} position={[0, 100, 0]}>
      <primitive object={sky.scene} />
    </mesh>
  );
};

export default Sky;
