import {useMemo} from "react";
import * as THREE from 'three'
import {Config} from "../lib/config";

function buildGeometry(points: Array<THREE.Vector2>, offset: THREE.Vector3, config: Config) {
    let i, l;
    const rectShape = new THREE.Shape();
    rectShape.moveTo(points[0].x, points[0].y);
    for (i = 1, l = points.length; i < l; i++) {
        rectShape.lineTo(points[i].x, points[i].y);
    }
    const extrudeSettings = {
        amount: config.model3d.sides.thickness,
        bevelSize: 0,
        bevelSegments: 1,
        bevelThickness: 0
    };
    const geometry = new THREE.ExtrudeGeometry(rectShape, extrudeSettings);

    // Utils.setupUVMapping(geometry);

    // Compensate for the extrusion amount, and move the whole shape by offset.
    let delta = new THREE.Vector3();
    delta.z = - config.model3d.sides.thickness / 2;
    delta = delta.add(offset);
    // geometry.vertices.forEach(function(vertex) {
    //     vertex.add(delta);
    // });
    return geometry;
}

interface Props {
    points: Array<THREE.Vector2>;
    offset: THREE.Vector3;
    config: Config;
}

export default function Side(props: Props) {
    const {points, offset, config} = props;
    const geometry = useMemo(
        () => buildGeometry(points, offset, config),
        [points, offset, config]
    );
    return (
        <mesh
            { ... props }
            name="Side"
            geometry={geometry}
        >
            <meshStandardMaterial color="blue" />
        </mesh>
    );
}