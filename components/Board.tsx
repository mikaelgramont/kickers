import {useGLTF} from "@react-three/drei";
import {useRef} from "react";
import * as THREE from "three";

export default function Board({distance}: { distance: number }) {

    // This makes the board about 120cm long:
    const scale = .52;
    const x = 1;
    const y = 0.125;
    const z = distance + .8;

    const group = useRef();

    // @ts-ignore Whatever!
    const { nodes, materials } = useGLTF('/board.glb')
    return (
        <group ref={group} dispose={null} rotation={new THREE.Euler(0, .5, 0)} position={new THREE.Vector3(x,y,z)} scale={new THREE.Vector3(scale, scale, scale)} >
            <mesh castShadow receiveShadow geometry={nodes.Board.geometry} material={materials.Deck}>
                <group position={[-0.04, -0.02, 0.6]} rotation={[0, 0, -Math.PI]} scale={[-1, -1, -1]}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane.geometry}
                        material={nodes.Plane.material}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane_1.geometry}
                        material={nodes.Plane_1.material}
                    />
                </group>
                <group position={[-0.04, -0.02, -0.6]}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane.geometry}
                        material={nodes.Plane.material}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane_1.geometry}
                        material={nodes.Plane_1.material}
                    />
                </group>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Left_truck_and_wheels.geometry}
                    material={nodes.Left_truck_and_wheels.material}
                    position={[0, -0.05, 1]}
                    rotation={[-0.05, 0, 0]}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cylinder.geometry}
                        material={nodes.Cylinder.material}
                        position={[0.34, 0, 0]}
                        rotation={[0.05, 0, 0]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cylinder_001.geometry}
                        material={nodes.Cylinder_001.material}
                        position={[-0.34, 0, 0]}
                        rotation={[-3.09, 0, -Math.PI]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane_2.geometry}
                        material={nodes.Plane_2.material}
                        rotation={[-0.39, 0, 0]}
                        scale={[0.51, 0.51, 0.51]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane_001.geometry}
                        material={nodes.Plane_001.material}
                        position={[0, 0.06, -0.06]}
                        rotation={[2.77, 0, 0]}
                        scale={[0.51, 0.51, 0.51]}
                    />
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Right_truck_and_wheels.geometry}
                    material={nodes.Right_truck_and_wheels.material}
                    position={[0, -0.05, -1]}
                    rotation={[-3.09, 0, -Math.PI]}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Back_Right_wheel.geometry}
                        material={nodes.Back_Right_wheel.material}
                        position={[-0.34, 0, 0]}
                        rotation={[-3.09, 0, -Math.PI]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Front_Right_wheel.geometry}
                        material={nodes.Front_Right_wheel.material}
                        position={[0.34, 0, 0]}
                        rotation={[0.05, 0, 0]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Bottom_truck.geometry}
                        material={nodes.Bottom_truck.material}
                        rotation={[-0.39, 0, 0]}
                        scale={[0.51, 0.51, 0.51]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Top_truck.geometry}
                        material={nodes.Top_truck.material}
                        position={[0, 0.06, -0.06]}
                        rotation={[2.77, 0, 0]}
                        scale={[0.51, 0.51, 0.51]}
                    />
                </mesh>
            </mesh>
        </group>
    )
}
