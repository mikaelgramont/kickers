import {useEffect, useMemo, useRef} from "react";
import {ContactShadows, OrbitControls, PerspectiveCamera, useGLTF} from '@react-three/drei'
import * as THREE from "three";

import Board from "./Board";
import Side from "./Side";
import Strut from "./Strut";
import Surface from "./Surface";
import config from "../lib/config";
import {calculateSidePoints, calculateStrutProps, calculateSurfacePoints} from "../lib/kicker";
import {useFrame} from "@react-three/fiber";
import {Camera} from "three";

interface Props {
    params: KickerParams;
}

export default function Scene({ params: { angle, arc, height, length, radius, width } }: Props) {
    const getCenterTarget = () => new THREE.Vector3(length * 0.8, height * 0.5, 0);

    useGLTF.preload('/board.glb');

    const targetRef = useRef(getCenterTarget());
    const cameraRef = useRef<Camera>();

    useEffect(() => {
        targetRef.current = getCenterTarget();
    }, [length, height]);

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
            <PerspectiveCamera ref={cameraRef} makeDefault position={[-1.8, 1, 2]} />
            <directionalLight position={new THREE.Vector3(300, 10, 300)} />
            <directionalLight position={new THREE.Vector3(-100, 200, -120)} />
            <ContactShadows opacity={.5} position={[0, 0, 0]} width={30} height={10} far={30} rotation={[Math.PI / 2, 0, 0]} />

            <OrbitControls target={targetRef.current} zoomSpeed={.3} maxPolarAngle={Math.PI / 2}/>

            <Board distance={width / 2}/>

            <group name="kicker">
                <Side name="side-left" points={sidePoints} config={config} width={width} color="red" />
                <Side name="side-right" points={sidePoints} config={config} width={width} color="green" left/>
                <Surface name="surface" points={surfacePoints} config={config} width={width} radius={radius} angle={angle} color="orange"/>
                {strutPropsList.map((strutProps) => <Strut {...strutProps} key={`${strutProps.name}-${strutProps.angle}`} />)}
            </group>
        </>
    );
}