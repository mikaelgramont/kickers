import {FormEvent, useState} from "react";

import styles from "./ParamForm.module.scss";

interface ParamFormProps {
    id: string;
    maxAngle: number;
    minAngle: number;
    maxHeight: number;
    minHeight: number;
    onUpdate: (angle: number, height: number) => void;
}

export default function ParamForm({id, maxAngle, minAngle, maxHeight, minHeight, onUpdate}: ParamFormProps) {
    const [height, setHeight] = useState((maxHeight + minHeight) / 2);
    const [angle, setAngle] = useState((maxAngle + minAngle) / 2);

    const onHeightChange = (e: FormEvent<HTMLInputElement>) => {
        setHeight(parseFloat(e.currentTarget.value));
        onParamChange();
    };
    const onAngleChange = (e: FormEvent<HTMLInputElement>) => {
        setAngle(parseFloat(e.currentTarget.value));
        onParamChange();
    }
    const onParamChange = () => {
        onUpdate(height, angle);
    }

    return (
        <form
            id={id}
            onSubmit={(e) => {
                e.preventDefault();
            }}
            className={styles.root}>
            <label>
                <span>Height</span>
                <input onChange={onHeightChange} type="range" min={minHeight} max={maxHeight} step="0.1" name="height" id="height" />
                <span>{height}m</span>
            </label>
            <label>
                <span>Exit Angle</span>
                <input onChange={onAngleChange} type="range" min={minAngle} max={maxAngle} step="1" name="angle" id="angle"/>
                <span>{angle}°</span>
            </label>
        </form>
    );
}