import {useMemo} from "react";
import * as THREE from 'three';
import {useTexture} from "@react-three/drei";

import {Config} from "../lib/config";

function setupUVMapping(geometry: THREE.ExtrudeGeometry, points: THREE.Vector2[], radius: number, angle: number) {
    const { array: vertices, count, itemSize: vertexStep } = geometry.getAttribute('position');
    const { array, itemSize: uvStep } = geometry.getAttribute('uv');
    const uv = array as Array<number>;
    for (let i = 0; i < count; i += 1) {
        const vertexOffset = i * vertexStep;
        const uvOffset = i * uvStep;

        // Computing uvs separately from the geometry means we have to compute
        // angles back from positions: not very smart.
        const currentAngle = Math.asin((vertices[vertexOffset]) / radius);
        uv[uvOffset] = currentAngle / (angle * Math.PI / 180);

        // Stretch along the whole width
        uv[uvOffset + 1] = vertices[vertexOffset + 2] === 0 ? 1.0 : 0;
    }
}

function buildGeometry(points: Array<THREE.Vector2>, width: number) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0].x, points[0].y);
    for (let i = 1, l = points.length; i < l; i++) {
        shape.lineTo(points[i].x, points[i].y);
    }

    const extrudeSettings = {
        depth: width,
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
    name: string;
    points: Array<THREE.Vector2>;
    width: number;
    radius: number;
    angle: number;
}

export default function Surface(props: Props) {
    const {config, name, points, radius, angle, width} = props;

    const geometry = useMemo(
        () => buildGeometry(points, width),
        [points, config]
    );
    setupUVMapping(geometry, points, radius, angle);

    const colorMap = useTexture('wood3_256.jpg');
    colorMap.wrapS = THREE.RepeatWrapping;
    colorMap.wrapT = THREE.ClampToEdgeWrapping;

    const { thickness } = config.model3d.sides;
    const position = new THREE.Vector3(0,0, -width / 2 + thickness / 2);

    return (
        <mesh
            { ... props }
            name={name}
            geometry={geometry}
            position={position}
        >
            <meshStandardMaterial map={colorMap} />
        </mesh>
    );
}