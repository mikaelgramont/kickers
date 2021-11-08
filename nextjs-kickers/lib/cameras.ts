import * as THREE from 'three';

import BoundingBoxHelper from "./boundingboxbelper";

export function createPerspectiveCamera(el) {
    const aspectRatio = el.clientWidth / el.clientHeight;
    const camera = new THREE.PerspectiveCamera(50, aspectRatio, 1, 1000);

    camera.position.copy(new THREE.Vector3(
        -0.95,
        1.64,
        3.85
    ));
    return camera;
};

export function createOrthoCamera(el, kickerObj) {
    // TODO: return null if kickerObj is not set

    const aspectRatio = el.clientWidth / el.clientHeight;
    const bb = new BoundingBoxHelper(kickerObj);
    const margin = 0.1;
    let w, h;
    bb.update(true);

    var xRange = (1 + margin) * Math.ceil(bb.box.max.x - bb.box.min.x),
        yRange = (1 + margin) * Math.ceil(bb.box.max.y - bb.box.min.y);

    var xCenter = (bb.box.max.x + bb.box.min.x) / 2,
        yCenter = (bb.box.max.y + bb.box.min.y) / 2;

    if (xRange > yRange) {
        w = xRange;
        h = w / aspectRatio;
    } else {
        h = yRange;
        w = h * aspectRatio;
    }

    var viewSize = h;
    var viewport = {
        viewSize: viewSize,
        aspectRatio: aspectRatio,
        left: xCenter - w / 2,
        right: xCenter + w / 2,
        top: yCenter + h / 2,
        bottom: yCenter - h / 2,
        near: -10,
        far: 10
    }

    var camera = new THREE.OrthographicCamera (
        viewport.left,
        viewport.right,
        viewport.top,
        viewport.bottom,
        viewport.near,
        viewport.far
    );
    return camera;
};
