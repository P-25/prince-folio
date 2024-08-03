/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useGLTF } from "@react-three/drei";

// 3D Model from: https://sketchfab.com/3d-models/phoenix-bird-844ba0cf144a413ea92c779f18912042
export function GoingMerry(props: any) {
  const { nodes, materials } = useGLTF("./assets/one_piece_-going_merry.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Object_2.geometry} material={materials.None} />
        <mesh geometry={nodes.Object_3.geometry} material={materials.None} />
        <mesh geometry={nodes.Object_4.geometry} material={materials.None} />
        <mesh geometry={nodes.Object_5.geometry} material={materials.None} />
        <mesh geometry={nodes.Object_6.geometry} material={materials.None} />
        <mesh geometry={nodes.Object_7.geometry} material={materials.None} />
        <mesh geometry={nodes.Object_8.geometry} material={materials.None} />
        <mesh geometry={nodes.Object_9.geometry} material={materials.None} />
        <mesh geometry={nodes.Object_10.geometry} material={materials.None} />
        <mesh geometry={nodes.Object_11.geometry} material={materials.None} />
        <mesh geometry={nodes.Object_12.geometry} material={materials.None} />
        <mesh geometry={nodes.Object_13.geometry} material={materials.None} />
        <mesh geometry={nodes.Object_14.geometry} material={materials.None} />
        <mesh geometry={nodes.Object_15.geometry} material={materials.None} />
        <mesh geometry={nodes.Object_16.geometry} material={materials.None} />
        <mesh geometry={nodes.Object_17.geometry} material={materials.None} />
        <mesh geometry={nodes.Object_18.geometry} material={materials.None} />
        <mesh geometry={nodes.Object_19.geometry} material={materials.None} />
        <mesh geometry={nodes.Object_20.geometry} material={materials.None} />
        <mesh geometry={nodes.Object_21.geometry} material={materials.None} />
        <mesh geometry={nodes.Object_22.geometry} material={materials.None} />
        <mesh geometry={nodes.Object_23.geometry} material={materials.None} />
        <mesh geometry={nodes.Object_24.geometry} material={materials.None} />
        <mesh geometry={nodes.Object_25.geometry} material={materials.None} />
        <mesh geometry={nodes.Object_26.geometry} material={materials.None} />
        <mesh geometry={nodes.Object_27.geometry} material={materials.None} />
        <mesh geometry={nodes.Object_28.geometry} material={materials.None} />
        <mesh geometry={nodes.Object_29.geometry} material={materials.None} />
        <mesh geometry={nodes.Object_30.geometry} material={materials.None} />
      </group>
    </group>
  );
}
export default GoingMerry;
