import { fetchIrisData } from "./DataService";
import { useState, useEffect } from "react";

// Custom Hook for fetching data
export const useData = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchIrisData().then((data) => {
      console.log(">> ", data);
      setData(data);
    });
  }, []);
  return data;
};
