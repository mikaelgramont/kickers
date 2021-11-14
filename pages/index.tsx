import {useState} from "react";
import Head from 'next/head';

import Input from "../components/Input";
import Output from "../components/Output";
import SceneContainer from "../components/SceneContainer";
import {calculateRadius, calculateLength, calculateArc} from "../lib/kicker";
import styles from "./index.module.scss";

const config = {
  initialAngle: 45,
  maxAngle: 90,
  minAngle: 0,
  initialHeight: 1.5,
  maxHeight: 5,
  minHeight: 0,
  initialWidth: 1.0,
  maxWidth: 5,
  minWidth: 0.5,
};

export default function Home() {
  const title = "Kicker design in React";

  const computeParams = function(height: number, angle: number, width: number) {
    const radius = calculateRadius(height, angle);
    const length = calculateLength(height, angle);
    const arc = calculateArc(radius, angle);
    return {
      height, angle, radius, length, arc, width
    };
  };

  const updateParams = function(height: number, angle: number, width: number) {
    setKickerParams(computeParams(height, angle, width));
  }

  const [kickerParams, setKickerParams] = useState<KickerParams>(
    computeParams(config.initialHeight, config.initialAngle, config.initialWidth)
  );

  return (
    <div className="container">
      <Head>
        <title>{title}</title>
      </Head>

      <main className={styles.root}>
        <h1 className="title">{title}</h1>
        <form onSubmit={(e) => {
          e.preventDefault();
        }}>
          <fieldset>
            <legend>Desired dimensions</legend>
            <Input {...config} onUpdate={updateParams}/>
          </fieldset>
          <fieldset>
            <legend>Calculated dimensions</legend>
            <Output params={kickerParams} />
          </fieldset>
        </form>

        <SceneContainer params={kickerParams} className={styles.kicker}/>
      </main>
    </div>
  )
}
