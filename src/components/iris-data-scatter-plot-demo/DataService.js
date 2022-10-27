import { csv } from "d3";
import irisData from "./demodata/iris.csv";

export const fetchIrisData = async () => {
  const prepareRow = (d) => {
    d["sepal.length"] = +d["sepal.length"];
    d["sepal.width"] = +d["sepal.width"];
    d["petal.length"] = +d["petal.length"];
    d["petal.width"] = +d["petal.width"];
    return d;
  };
  let modifiedIrisData = await csv(irisData, prepareRow);
  let attributes = await modifiedIrisData.columns.map((attribute) => {
    return { value: attribute, label: attribute.split(".").join(" ") };
  });
  modifiedIrisData["attributes"] = attributes;
  return modifiedIrisData;
};
