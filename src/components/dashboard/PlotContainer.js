import IrisDataScatterPlotDemo from "../iris-data-scatter-plot-demo/IrisDataScatterPlotDemo";
import styles from "./PlotContainer.module.css";
const PlotContainer = () => {
  return (
    <div class={styles["dashboard"]}>
      <IrisDataScatterPlotDemo />
      {/* <IrisDataScatterPlotDemo /> */}
    </div>
  );
};
export default PlotContainer;
