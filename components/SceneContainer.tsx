import {Suspense} from "react";
import { Canvas } from '@react-three/fiber';
import {ErrorBoundary} from 'react-error-boundary';

import Scene from "./Scene";
import styles from "./SceneContainer.module.scss";

interface Props {
    className: string;
    params: KickerParams;
}

function ErrorFallback({error, resetErrorBoundary}: {error: Error, resetErrorBoundary: () => void}) {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    )
}

export default function SceneContainer({className, params}: Props) {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <div className={className}>
                <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }} className={styles.canvas}>
                    <Suspense fallback={null}>
                        <Scene params={params} />
                    </Suspense>
                </Canvas>
            </div>
        </ErrorBoundary>
    );
}