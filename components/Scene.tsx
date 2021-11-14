import {useMemo} from "react";
import {OrbitControls, Bounds} from '@react-three/drei'
import * as THREE from "three";

import Side from "./Side";
import Strut from "./Strut";
import Surface from "./Surface";
import config from "../lib/config";
import {calculateSidePoints, calculateStrutParams, calculateSurfacePoints} from "../lib/kicker";

interface Props {
    params: KickerParams;
}

export default function Scene({ params: { angle, arc, length, radius, width } }: Props) {
    const sidePoints: Array<THREE.Vector2> = useMemo(
        () => calculateSidePoints(angle, radius, config),
        [angle, radius, config]);
    const surfacePoints: Array<THREE.Vector2> = useMemo(
        () => calculateSurfacePoints(angle, radius, config),
        [angle, radius, width, config]);
    const struts = useMemo(
        () => calculateStrutParams(length, width, angle, arc, radius, config),
        [length, width, angle, arc, radius, config]);

    console.log({struts});

    return (
        <Bounds fit clip damping={6} margin={1.2}>
            <OrbitControls makeDefault />

            <ambientLight />
            <pointLight position={[10, 10, 10]} />

            <Side name="side-left" points={sidePoints} config={config} width={width} color="red" />
            <Side name="side-right" points={sidePoints} config={config} width={width} color="green" left/>

            <Surface name="surface" points={surfacePoints} config={config} width={width}  color="orange"/>

            {struts.map((strutProps) => <Strut {...strutProps} key={strutProps.angle} />)}
        </Bounds>
    );
}
