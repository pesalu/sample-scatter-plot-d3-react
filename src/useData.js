import { fetchWorldPopulation } from "./DataService";
import { useState, useEffect } from "react";

// Custom Hook for fetching data
export const useData = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchWorldPopulation().then((data) => {
      setData(data.slice(0, 10));
    });
  }, []);
  return data;
};
