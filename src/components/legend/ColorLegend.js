import styles from "./ColorLegend.module.css";

export const ColorLegend = ({
  colorLegendLabel,
  colorScale,
  tickSpacing = 20,
  tickSize = 10,
  tickTextOffset = 20,
  onHover,
  hoveredValue,
  fadeOpacity = 0.2,
}) => {
  return (
    <>
      <text className={styles["legend-label"]} x={-10} y={-25}>
        {colorLegendLabel}
      </text>
      {colorScale.domain().map((domainValue, idx) => {
        return (
          <g
            key={domainValue}
            transform={`translate(0, ${idx * tickSpacing})`}
            onMouseEnter={(e) => {
              onHover(domainValue);
            }}
            onMouseOut={(e) => {
              onHover(null);
            }}
            opacity={
              hoveredValue && domainValue !== hoveredValue ? fadeOpacity : 1
            }
          >
            <circle fill={colorScale(domainValue)} r={tickSize}></circle>
            <text className={styles["tick"]} x={tickTextOffset} dy="0.32em">
              {domainValue}
            </text>
          </g>
        );
      })}
    </>
  );
};
