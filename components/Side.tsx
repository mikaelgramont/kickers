import {useMemo} from "react";
import * as THREE from 'three';
import {Config} from "../lib/config";

function buildGeometry(points: Array<THREE.Vector2>, config: Config) {
    let i, l;
    const rectShape = new THREE.Shape();
    rectShape.moveTo(points[0].x, points[0].y);
    for (i = 1, l = points.length; i < l; i++) {
        rectShape.lineTo(points[i].x, points[i].y);
    }
    const extrudeSettings = {
        depth: config.model3d.sides.thickness,
        bevelSize: 0,
        bevelSegments: 1,
        bevelThickness: 0
    };
    const geometry = new THREE.ExtrudeGeometry(rectShape, extrudeSettings);

    return geometry;
}

interface Props {
    points: Array<THREE.Vector2>;
    position: THREE.Vector3;
    color: string;
    config: Config;
    name: string;
}

export default function Side(props: Props) {
    const {points, config, color, name, position} = props;
    const geometry = useMemo(
        () => buildGeometry(points, config),
        [points, config]
    );
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