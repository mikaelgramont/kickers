import { Config } from "./config";
import * as THREE from 'three'

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

export function calculatePoints (
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