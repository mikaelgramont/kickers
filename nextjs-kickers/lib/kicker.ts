 export function calculateRadius(h: number, angleDeg: number) {
    const alphaRad = angleDeg * Math.PI / 180,
        r = h / (1 - Math.cos(alphaRad));
    return r;
}

 export function calculateLength(h: number, angleDeg: number, extraLength = 0) {
    const angleRad = angleDeg * Math.PI / 180,
        l = h * Math.sin(angleRad) / (1 - Math.cos(angleRad)) + extraLength;
    return l;
}

 export function calculateArc(radius: number, angleDeg: number) {
    const arc = radius * angleDeg * Math.PI / 180;
    return arc;
}
