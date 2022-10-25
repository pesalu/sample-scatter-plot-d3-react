import axios from "axios";
import { csv, range } from "d3";
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
  console.log(modifiedIrisData);
  let attributes = await modifiedIrisData.columns.map((attribute) => {
    return { value: attribute, label: attribute.split(".").join(" ") };
  });
  console.log("ATTR: ", attributes);
  modifiedIrisData["attributes"] = attributes;
  return modifiedIrisData;
};

export const fetchWorldPopulation = async () => {
  const url =
    "https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv";

  // Add column Population which has population at the
  // latest year
  const prepareRow = (d) => {
    d.Population = +d["2020"] * 1000;
    return d;
  };

  return await csv(url, prepareRow);
};

export const fetchPopulation = async (startYear, endYear, step) => {
  const url =
    "https://statfin.stat.fi/PXWeb/api/v1/fi/StatFin/statfin_vaerak_pxt_11re.px";

  let years = range(startYear || 1990, endYear || 2022, step || 1).map(
    (year) => `${year}`
  );

  let jsonQuery = {
    query: [
      {
        code: "Vuosi",
        selection: {
          filter: "item",
          values: years,
        },
      },
    ],
    response: {
      format: "json",
    },
  };

  const response = await axios({
    method: "post",
    url: url,
    data: jsonQuery,
  });

  return prepareData(response.data);
};

let prepareData = (data) => {
  let dataTmp = data.data;
  return dataTmp.map((dp) => {
    return {
      year: parseInt(dp.key[0]),
      population: parseInt(dp.values[0]),
    };
  });
};
