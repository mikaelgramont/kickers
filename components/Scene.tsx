import {useMemo} from "react";
import {OrbitControls, Stage} from '@react-three/drei'
import * as THREE from "three";

import Side from "./Side";
import Strut from "./Strut";
import Surface from "./Surface";
import config from "../lib/config";
import {calculateSidePoints, calculateStrutProps, calculateSurfacePoints} from "../lib/kicker";

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
    const strutPropsList = useMemo(
        () => calculateStrutProps(length, width, angle, arc, radius, config),
        [length, width, angle, arc, radius, config]);

    const contactShadow = { blur: 2, opacity: .5};

    return (
        <Stage contactShadow={contactShadow} adjustCamera={false} intensity={.4}>
            <OrbitControls makeDefault />

            <Side name="side-left" points={sidePoints} config={config} width={width} color="red" />
            <Side name="side-right" points={sidePoints} config={config} width={width} color="green" left/>

            <Surface name="surface" points={surfacePoints} config={config} width={width} radius={radius} angle={angle} color="orange"/>

            {strutPropsList.map((strutProps) => <Strut {...strutProps} key={`${strutProps.name}-${strutProps.angle}`} />)}
        </Stage>
    );
}
