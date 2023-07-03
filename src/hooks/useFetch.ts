import axios from "axios";
import { useEffect, useState } from "react";
import errorToString from "../helpers/errorToString";
import { IAxiosResponse } from "../interfaces";

const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async (url: string) => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(url);
        setData(data);
      } catch (err) {
        const error = err as IAxiosResponse;
        setError(errorToString(error?.response?.data));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(url);
  }, [url]);

  return { data, error, isLoading };
};

export default useFetch;
