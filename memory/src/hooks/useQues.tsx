import { useQuery } from "react-query";
import {TestDB} from "../types";


// --------------------------------------------------------------------
export const getTest = async (day_id: string) => {
  const url = `http://localhost:4000/get/test?day_id=${day_id}`;
  const data = await fetch(url);

  if (!data.ok) throw new Error("Something is wrong");
  return data.json();
};

export const useQues = (id: string) => {
  return useQuery<TestDB, Error>(["test", id], () => getTest(id));
};
