import {useMemo} from "react";
import * as THREE from 'three';
import {useTexture} from "@react-three/drei";

function buildGeometry(radius: number, angle: number, width: number, thickness: number) {
    const geometry = new THREE.BoxGeometry(thickness, thickness, width);

    const offset = new THREE.Vector3(0, -radius - thickness/2, 0);
    const radiusYOffset = new THREE.Vector3(0, radius, 0);

    const position = geometry.getAttribute('position');
    const vertex = new THREE.Vector3(0,0,0);

    if (angle) {
        for (let i = 0; i < position.count; i ++) {
            vertex.x = position.getX(i);
            vertex.y = position.getY(i);
            vertex.z = position.getZ(i);

            // 1. Move all the points down by radius.
            vertex.add(offset);
            // 2. Rotate them by angle.
            const m4 = new THREE.Matrix4();
            m4.set(
                Math.cos(-angle), Math.sin(-angle), 0, 0,
                - Math.sin(-angle), Math.cos(-angle), 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            );
            vertex.applyMatrix4(m4);
            // 3. Move the position up by radius
            vertex.add(radiusYOffset);

            position.setX(i, vertex.x);
            position.setY(i, vertex.y);
            position.setZ(i, vertex.z);
        }
    }

    return geometry;
}

export interface Props {
    angle: number;
    name: string;
    position: THREE.Vector3;
    radius: number;
    thickness: number;
    width: number;
}

export default function Strut(props: Props) {
    const {angle, name, position, radius, thickness, width} = props;
    const geometry = useMemo(
        () => buildGeometry(radius, angle, width, thickness),
        [radius, angle, width, thickness]
    );

    const colorMap = useTexture('wood1_256.jpg');

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