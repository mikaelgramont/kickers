import {useMemo} from "react";
import * as THREE from 'three';
import {useTexture} from "@react-three/drei";

import {Config} from "../lib/config";

// Computes uv tuples so that the whole texture maps to a square whose size is
// whichever is longer: height or length.
function setupUVMapping(geometry: THREE.ExtrudeGeometry) {
    let maxX = -Infinity,
        minX = Infinity,
        maxY = -Infinity,
        minY = Infinity;

    const { array: vertices, count, itemSize: vertexStep } = geometry.getAttribute('position');
    const { array, itemSize: uvStep } = geometry.getAttribute('uv');
    const uv = array as Array<number>;

    for (let i = 0; i < count; i += vertexStep) {
        maxX = Math.max(maxX, vertices[i]);
        minX = Math.min(minX, vertices[i]);

        maxY = Math.max(maxY, vertices[i + 1]);
        minY = Math.min(minY, vertices[i + 1]);
    }
    const rangeX = maxX - minX;
    const rangeY = maxY - minY;

    // This is key to making sure the texture does not stretch or compresses vertically:
    const range = Math.max(rangeX, rangeY);

    for (let i = 0; i < count; i += 1) {
        const vertexOffset = i * vertexStep;
        const uvOffset = i * uvStep;

        uv[uvOffset] = (vertices[vertexOffset] - minX) / range;
        uv[uvOffset + 1] = (vertices[vertexOffset + 1] - minY) / range;
    }
}

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
    // Alternative to this: pass a UVGenerator into THREE.ExtrudeGeometry options
    // (generateTopUV for triangles on shape, generateSideWallUV for extruded quads)
    // See https://discourse.threejs.org/t/texture-on-dynamically-created-object/2994/10
    setupUVMapping(geometry);

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
    const {config, left = false, name, points, width} = props;

    const geometry = useMemo(
        // TODO: integrate offset directly into the geometry
        () => buildGeometry(points, config),
        [points, config]
    );
    const colorMap = useTexture('wood1_256.jpg');

    const {thickness} = config.model3d.sides;
    const offset = left ? -width / 2 + thickness / 2 : width / 2 - thickness / 2;
    const position = new THREE.Vector3(0, 0, offset);

    return (
        <mesh
            {...props}
            name={name}
            geometry={geometry}
            position={position}
        >
            <meshStandardMaterial map={colorMap} />
        </mesh>
    );
}