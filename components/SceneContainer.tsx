import { Canvas } from '@react-three/fiber';

import Scene from "./Scene";
import styles from "./SceneContainer.module.scss";

interface Props {
    className: string;
    params: KickerParams;
}

export default function SceneContainer({className, params}: Props) {
    return (
        <div className={className}>
            <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }} className={styles.canvas}>
                <Scene params={params} />
            </Canvas>
        </div>
    );
}