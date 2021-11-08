import {useState} from "react";
import Head from 'next/head';

import Input from "../components/Input";
import Output from "../components/Output";
import Kicker from "../components/Kicker";
import {calculateRadius, calculateLength, calculateArc} from "../lib/kicker";
import styles from "./index.module.scss";

const config = {
  initialAngle: 45,
  maxAngle: 90,
  minAngle: 0,
  initialHeight: 1.5,
  maxHeight: 5,
  minHeight: 0,
};

export default function Home() {
  const title = "Kicker design in React";

  const computeParams = function(height: number, angle: number) {
    const radius = calculateRadius(height, angle);
    const length = calculateLength(height, angle);
    const arc = calculateArc(radius, angle);
    return {
      height, angle, radius, length, arc
    };
  };

  const updateParams = function(height: number, angle: number) {
    setKickerParams(computeParams(height, angle));
  }

  const [kickerParams, setKickerParams] = useState<KickerParams>(
    computeParams(config.initialHeight, config.initialAngle)
  );

  return (
    <div className="container">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
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

        <Kicker params={kickerParams} className={styles.kicker}/>
      </main>
    </div>
  )
}
