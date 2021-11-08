import {FormEvent, useState} from "react";

import styles from "./Input.module.scss";

interface ParamFormProps {
    initialAngle: number;
    maxAngle: number;
    minAngle: number;
    initialHeight: number;
    maxHeight: number;
    minHeight: number;
    onUpdate: (angle: number, height: number) => void;
}

export default function Input({initialAngle, maxAngle, minAngle, initialHeight, maxHeight, minHeight, onUpdate}: ParamFormProps) {
    const [height, setHeight] = useState(initialHeight);
    const [angle, setAngle] = useState(initialAngle);

    const onHeightChange = (e: FormEvent<HTMLInputElement>) => {
        setHeight(parseFloat(e.currentTarget.value));
        onParamChange(parseFloat(e.currentTarget.value), angle);
    };
    const onAngleChange = (e: FormEvent<HTMLInputElement>) => {
        setAngle(parseFloat(e.currentTarget.value));
        onParamChange(height, parseFloat(e.currentTarget.value));
    }
    const onParamChange = (h: number, a: number) => {
        onUpdate(h, a);
    }

    return (
        <div
            className={styles.root}>
            <label>
                <span>Height</span>
                <input onChange={onHeightChange} type="range" value={height} min={minHeight} max={maxHeight} step="0.1" name="height" id="height" />
                <span>{height}m</span>
            </label>
            <label>
                <span>Exit Angle</span>
                <input onChange={onAngleChange} type="range" value={angle} min={minAngle} max={maxAngle} step="1" name="angle" id="angle"/>
                <span>{angle}°</span>
            </label>
        </div>
    );
}