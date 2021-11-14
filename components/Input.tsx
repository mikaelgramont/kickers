import {FormEvent, useState} from "react";

import styles from "./Input.module.scss";

interface ParamFormProps {
    initialAngle: number;
    maxAngle: number;
    minAngle: number;
    initialHeight: number;
    maxHeight: number;
    minHeight: number;
    initialWidth: number;
    maxWidth: number;
    minWidth: number;
    onUpdate: (angle: number, height: number, width:number) => void;
}

export default function Input({
        initialAngle,
        maxAngle,
        minAngle,
        initialHeight,
        maxHeight,
        minHeight,
        initialWidth,
        maxWidth,
        minWidth,
        onUpdate
    }: ParamFormProps) {
    const [height, setHeight] = useState(initialHeight);
    const [angle, setAngle] = useState(initialAngle);
    const [width, setWidth] = useState(initialWidth);

    const onHeightChange = (e: FormEvent<HTMLInputElement>) => {
        setHeight(parseFloat(e.currentTarget.value));
        onParamChange(parseFloat(e.currentTarget.value), angle, width);
    };
    const onAngleChange = (e: FormEvent<HTMLInputElement>) => {
        setAngle(parseFloat(e.currentTarget.value));
        onParamChange(height, parseFloat(e.currentTarget.value), width);
    }
    const onWidthChange = (e: FormEvent<HTMLInputElement>) => {
        setWidth(parseFloat(e.currentTarget.value));
        onParamChange(height, angle, parseFloat(e.currentTarget.value));
    }
    const onParamChange = (h: number, a: number, w: number) => {
        onUpdate(h, a, w);
    }

    return (
        <div
            className={styles.root}>
            <label>
                <span>Height: {height}m</span>
                <input
                    onChange={onHeightChange}
                    type="range"
                    value={height}
                    min={minHeight}
                    max={maxHeight}
                    step="0.1"
                    name="height"
                    id="height" />
            </label>
            <label>
                <span>Exit Angle: {angle}°</span>
                <input
                    onChange={onAngleChange}
                    type="range"
                    value={angle}
                    min={minAngle}
                    max={maxAngle}
                    step="1"
                    name="angle"
                    id="angle"
                />
            </label>
            <label>
                <span>Width: {width}m</span>
                <input
                    onChange={onWidthChange}
                    type="range"
                    value={width}
                    min={minWidth}
                    max={maxWidth}
                    step="0.1"
                    name="width"
                    id="width"
                />
            </label>
        </div>
    );
}