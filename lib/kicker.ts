import { Config } from "./config";
import * as THREE from 'three';

import {Props as StrutProps} from "../components/Strut";

export function calculateRadius(h: number, angleDeg: number) {
    const alphaRad = angleDeg * Math.PI / 180;
    const r = h / (1 - Math.cos(alphaRad));
    return r;
}

 export function calculateLength(h: number, angleDeg: number, extraLength = 0) {
    const angleRad = angleDeg * Math.PI / 180;
    const l = h * Math.sin(angleRad) / (1 - Math.cos(angleRad)) + extraLength;
    return l;
}

 export function calculateArc(radius: number, angleDeg: number) {
    const arc = radius * angleDeg * Math.PI / 180;
    return arc;
}

export function calculateSidePoints(angle: number, radius: number, config: Config) {
    const minY = config.model3d.sides.minHeight;
    const minX = Math.acos(1 - minY / radius);

    const points: Array<THREE.Vector2> = calculatePoints(minX, minY, angle, radius, config);
    const lastPoint: THREE.Vector2 = points[points.length - 1];
    const extraLength = config.model3d.sides.extraLength;

    // Extend the sides a bit so we have room for a strut at the top
    points.push(new THREE.Vector2(lastPoint.x + extraLength, lastPoint.y));
    points.push(new THREE.Vector2(lastPoint.x + extraLength, 0));

    points.unshift(new THREE.Vector2(points[0].x, 0));

    return points;
}

export function calculateSurfacePoints(angle: number, radius: number, config: Config) {
    const points: Array<THREE.Vector2> = calculatePoints(0, 0, angle, radius, config);
    const {thickness} = config.model3d.surface;

    const steps = points.length;
    const angleRad = angle * Math.PI / 180;

    let x, y;
    for (let l = points.length - 1, i = l; i >= 0; i--) {
        const currentAngleRad = i / steps * angleRad;
        x = points[i].x - thickness * Math.sin(currentAngleRad);
        y = points[i].y + thickness * Math.cos(currentAngleRad);

        points.push(new THREE.Vector2(x, y));
    }

    return points;
}

function calculatePoints (
    minX: number, minY: number, angle: number, radius: number, config: Config
): Array<THREE.Vector2> {
    const angleRad = angle * Math.PI / 180;
    const steps = config.model3d.sides.steps;
    let currentAngleRad, x, y;

    const points: Array<THREE.Vector2> = [];
    for (let i = 0; i <= steps; i++) {
        currentAngleRad = i / steps * angleRad;
        x = radius * Math.sin(currentAngleRad);
        y = radius * (1 - Math.cos(currentAngleRad));
        if (y < minY) {
            continue;
        }
        points.push(new THREE.Vector2(x, y));
    }

    return points;
};

export function calculateStrutParams(length: number, width: number, angle: number, arc: number, radius: number, config: Config): Array<StrutProps> {
    const struts = [];
    const strutCount = Math.ceil(arc / config.model3d.struts.maximumDistance);
    // const {extraLength} = config.model3d.sides;
    // const minY = config.model3d.sides.minHeight;
    // const minX = Math.acos(1 - minY / radius);

    let i = strutCount;
    let { thickness } = config.model3d.struts;
    let strut: StrutProps;
    let offset: THREE.Vector3;

    // We need to move the struts back a bit so they sit flush with the end
    // of the ramp.
    const offsetAngleRad = thickness / (2 * radius);

    while (i) {
        const currentAngle = angle * i / strutCount;
        const currentAngleRad = currentAngle * Math.PI / 180 - offsetAngleRad;
        const y = radius * (1 - Math.cos(currentAngleRad));

        if (y < thickness) {
            // Use a smaller type of strut as the big ones don't fit.
            thickness = config.model3d.struts.smallSide;
        }
        if (y < thickness) {
            // Can't fit anything anymore.
            break;
        }

        strut = {
            angle: currentAngleRad,
            color: "pink",
            name: `strut-${i}`,
            radius,
            thickness,
            position: new THREE.Vector3(0,0, config.model3d.sides.thickness / 2),
            width: width - config.model3d.sides.thickness * 2,
        };
        struts.push(strut);
        i--;
    }

    return struts;
}