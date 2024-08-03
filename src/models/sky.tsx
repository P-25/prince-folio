// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useGLTF, useFrame } from "@react-three/drei";
import { useRef } from "react";
import { Mesh } from "three";

// Define the type for props
interface SkyProps {
  isRotating: boolean;
}

const Sky: React.FC<SkyProps> = ({ isRotating }) => {
  const sky = useGLTF("./assets/sky.glb");
  const skyRef = useRef<Mesh>(null); // Specify Mesh as the type for the ref

  // Note: Animation names can be found on the Sketchfab website where the 3D model is hosted.
  // It ensures smooth animations by making the rotation frame rate-independent.
  // 'delta' represents the time in seconds since the last frame.
  useFrame((_, delta) => {
    if (isRotating) {
      if (skyRef.current) {
        skyRef.current.rotation.y += 0.25 * delta; // Adjust the rotation speed as needed
      }
    }
  });

  return (
    <mesh ref={skyRef} position={[0, 100, 0]}>
      <primitive object={sky.scene} />
    </mesh>
  );
};

export default Sky;
