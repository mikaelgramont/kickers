import {useMemo} from "react";
import * as THREE from 'three';
import {Config} from "../lib/config";
import {useTexture} from "@react-three/drei";

function buildGeometry(points: Array<THREE.Vector2>, width: number, config: Config) {
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

}

export default function Surface(props: Props) {
    const {points, config, name, width} = props;

    const geometry = useMemo(
        () => buildGeometry(points, width, config),
        [points, config]
    );

    const colorMap = useTexture('wood3_256.jpg');

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