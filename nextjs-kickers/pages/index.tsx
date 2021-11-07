import {useState} from "react";
import Head from 'next/head';

import {calculateRadius, calculateLength, calculateArc} from "../lib/kicker";
import ParamForm from "../components/ParamForm";
import Output from "../components/Output";

const config = {
  maxAngle: 90,
  minAngle: 0,
  maxHeight: 5,
  minHeight: 0,
};

export default function Home() {
  const title = "Kicker design in React";
  const formId = "main-form";

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

      <main>
        <h1 className="title">{title}</h1>
        <div>
          <ParamForm id={formId} {...config} onUpdate={recomputeParams}/>
          <Output params={kickerParams} />
        </div>
      </main>
    </div>
  )
}
