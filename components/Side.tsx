import {useMemo} from "react";
import * as THREE from 'three';
import {Config} from "../lib/config";

function buildGeometry(points: Array<THREE.Vector2>, config: Config) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0].x, points[0].y);
    for (let i = 1, l = points.length; i < l; i++) {
        shape.lineTo(points[i].x, points[i].y);
    }
    const extrudeSettings = {
        depth: config.model3d.sides.thickness,
        bevelSize: 0,
        bevelSegments: 1,
        bevelThickness: 0
    };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    return geometry;
}

interface Props {
    color: string;
    config: Config;
    left?: boolean
    name: string;
    points: Array<THREE.Vector2>;
    width: number;
}

export default function Side(props: Props) {
    const {color, config, left = false, name, points, width} = props;
    const geometry = useMemo(
        () => buildGeometry(points, config),
        [points, config]
    );

    const { thickness } = config.model3d.sides;
    const offset = left ? - width/2 + thickness / 2: width / 2 - thickness / 2;
    const position = new THREE.Vector3(0,0, offset);
    return (
        <mesh
            { ... props }
            name={name}
            geometry={geometry}
            position={position}
        >
            <meshStandardMaterial color={color} />
        </mesh>
    );
}