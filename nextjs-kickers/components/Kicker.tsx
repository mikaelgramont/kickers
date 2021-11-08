import {useMemo, useRef} from "react";
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

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
    const canvasRef = useRef(null);
    const sidePoints: Array<THREE.Vector2> = useMemo(
        () => calculateSidePoints(angle, radius, config),
[angle, radius, config]);
    const { perspCam, orthoCam } = useCameras(canvasRef.current, obj);

    // TODO: create an object as a react element
    // give it a ref
    // pass that ref to the hook so it can use that to build cameras

    return (
        <div className={className} ref={canvasRef}>
            <Canvas>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />

                <Side points={sidePoints} offset={offset} config={config} />
            </Canvas>
        </div>
    );
}