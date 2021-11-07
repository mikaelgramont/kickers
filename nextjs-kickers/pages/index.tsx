import {useState} from "react";
import Head from 'next/head';

import {calculateRadius, calculateLength, calculateArc} from "../lib/kicker";
import Input from "../components/Input";
import Output from "../components/Output";
import styles from "./index.module.scss";

const config = {
  maxAngle: 90,
  minAngle: 0,
  maxHeight: 5,
  minHeight: 0,
};

export default function Home() {
  const title = "Kicker design in React";

  const [kickerParams, setKickerParams] = useState<KickerParams>({
    angle: 0,
    height: 0,
    radius: 0,
    length: 0,
    arc: 0,
  });

  const recomputeParams = function(height: number, angle: number) {
    const radius = calculateRadius(height, angle);
    const length = calculateLength(height, angle);
    const arc = calculateArc(radius, angle);

    setKickerParams({ angle, height, radius, length, arc });
  }

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
            <Input {...config} onUpdate={recomputeParams}/>
          </fieldset>
          <fieldset>
            <legend>Calculated dimensions</legend>
            <Output params={kickerParams} />
          </fieldset>
        </form>
      </main>
    </div>
  )
}
