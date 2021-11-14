import {useMemo} from "react";
import {OrbitControls, Bounds} from '@react-three/drei'
import * as THREE from "three";

import Side from "./Side";
import config from "../lib/config";
import {calculateSidePoints} from "../lib/kicker";

// TODO: figure out what to do with this;
const width = 20;
const offset = new THREE.Vector3(0, 0, width / 2);

interface Props {
    params: KickerParams;
}

export default function Scene({ params: { angle, radius } }: Props) {
    const sidePoints: Array<THREE.Vector2> = useMemo(
        () => calculateSidePoints(angle, radius, config),
        [angle, radius, config]);

    return (
        <Bounds fit clip damping={6} margin={1.2}>
            <OrbitControls makeDefault />

            <ambientLight />
            <pointLight position={[10, 10, 10]} />

            <Side points={sidePoints} offset={offset} config={config} />
        </Bounds>
    );
}
