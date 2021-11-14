import styles from "./Output.module.scss";

interface OutputProps {
    params: KickerParams;
}

const round = (num: number) => {
    return num.toFixed(2);
}

export default function({ params }: OutputProps) {
    const {radius, length, arc} = params;
    return (
        <div className={styles.root}>
          <output title={`${radius}`} htmlFor="angle height">{`Radius: ${round(radius)}m`}</output>
          <output title={`${length}`} htmlFor="angle height">{`Length: ${round(length)}m`}</output>
          <output title={`${arc}`} htmlFor="angle height">{`Arc: ${round(arc)}m`}</output>
        </div>
    );
}