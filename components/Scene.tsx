import {useMemo} from "react";
import {ContactShadows, OrbitControls, PerspectiveCamera, useGLTF} from '@react-three/drei'
import * as THREE from "three";

import Board from "./Board";
import Side from "./Side";
import Strut from "./Strut";
import Surface from "./Surface";
import config from "../lib/config";
import {calculateSidePoints, calculateStrutProps, calculateSurfacePoints} from "../lib/kicker";
import {PlaneGeometry} from "three";

interface Props {
    params: KickerParams;
}

export default function Scene({ params: { angle, arc, length, radius, width } }: Props) {
    useGLTF.preload('/board.glb')

    const sidePoints: Array<THREE.Vector2> = useMemo(
        () => calculateSidePoints(angle, radius, config),
        [angle, radius, config]);
    const surfacePoints: Array<THREE.Vector2> = useMemo(
        () => calculateSurfacePoints(angle, radius, config),
        [angle, radius, width, config]);
    const strutPropsList = useMemo(
        () => calculateStrutProps(length, width, angle, arc, radius, config),
        [length, width, angle, arc, radius, config]);

    return (
        <>
            <OrbitControls makeDefault />
            <PerspectiveCamera makeDefault position={[length / 2, 1.7, 6]} />

            <ContactShadows opacity={.5} position={[0, 0, 0]} width={10} height={10} far={20} rotation={[Math.PI / 2, 0, 0]} />

            <directionalLight position={new THREE.Vector3(300, 10, 300)} />
            <directionalLight position={new THREE.Vector3(-100, 200, -120)} />

            <Board position={new THREE.Vector3(6,0,5)} rotation={new THREE.Euler(0, .75, 0)}/>

            {/*<Board position={new THREE.Vector3(0,0,0)} rotation={new THREE.Euler(0, 0, 0)}/>*/}
            <group name="kicker">
                <Side name="side-left" points={sidePoints} config={config} width={width} color="red" />
                <Side name="side-right" points={sidePoints} config={config} width={width} color="green" left/>
                <Surface name="surface" points={surfacePoints} config={config} width={width} radius={radius} angle={angle} color="orange"/>
                {strutPropsList.map((strutProps) => <Strut {...strutProps} key={`${strutProps.name}-${strutProps.angle}`} />)}
            </group>
        </>
    );
}