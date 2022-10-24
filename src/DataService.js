import axios from "axios";
import { csv, csvParse, range } from "d3";

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

  console.log("DA: ", response);
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
