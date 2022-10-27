import styles from "./AxisLeft.module.css";

export const AxisLeft = ({ yScale, innerWidth, tickOffset = 5 }) =>
  yScale.ticks().map((tickValue, idx) => (
    <g
      key={idx}
      className={styles["tick"]}
      transform={`translate(0, ${yScale(tickValue)})`}
    >
      <line x2={innerWidth} />
      <text
        key={tickValue}
        style={{ textAnchor: "end" }}
        dy="0.32em"
        x={-tickOffset}
      >
        {tickValue}
      </text>
    </g>
  ));
