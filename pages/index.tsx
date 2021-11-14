import {useState} from "react";
import Head from 'next/head';

import Input from "../components/Input";
import Output from "../components/Output";
import SceneContainer from "../components/SceneContainer";
import config from "../lib/config";
import {calculateRadius, calculateLength, calculateArc} from "../lib/kicker";
import styles from "./index.module.scss";

export default function Home() {
  const {params} = config;
  const title = "Kicker designer";

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
    computeParams(params.initialHeight, params.initialAngle, params.initialWidth)
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
            <Input {...params} onUpdate={updateParams}/>
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
