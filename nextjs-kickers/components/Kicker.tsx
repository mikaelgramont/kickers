import {useMemo} from "react";
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three'

import Side from "./Side";
import config from "../lib/config";
import {calculateSidePoints} from "../lib/kicker";

interface Props {
    className: string;
    params: KickerParams;
}

// TODO: figure out what to do with this;
const width = 20;
const offset = new THREE.Vector3(0, 0, width / 2);

export default function Kicker({className, params: {angle, radius}}: Props) {
    const sidePoints: Array<THREE.Vector2> = useMemo(
        () => calculateSidePoints(angle, radius, config),
[angle, radius, config]);

    return (
        <div className={className}>
            <Canvas>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />

                <Side points={sidePoints} offset={offset} config={config} />
            </Canvas>
        </div>
    );
}