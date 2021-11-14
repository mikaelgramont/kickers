import styles from "./Output.module.scss";

interface OutputProps {
    params: KickerParams;
}

const round = (num: number, precision = 2) => {
    return num.toFixed(precision);
}

export default function({ params }: OutputProps) {
    const {radius, length, arc} = params;
    return (
        <div className={styles.root}>
          <output title={`${round(radius, 5)}`} htmlFor="angle height">{`Radius: ${round(radius)}m`}</output>
          <output title={`${round(length, 5)}`} htmlFor="angle height">{`Length: ${round(length)}m`}</output>
          <output title={`${round(arc, 5)}`} htmlFor="angle height">{`Arc: ${round(arc)}m`}</output>
        </div>
    );
}