import { useQuery } from "react-query";

export interface SingleDay {
    tags: string[],
    _id : string,
    name: string,
    group_id : string
    
}

export interface DayJSON {
  name: string;
  _id: string;
  days: SingleDay[];
}
// ------------------------------------------------
const getDays = async () => {
  const url = "http://localhost:4000/get/days";

  const data = await fetch(url);

  if (!data.ok) throw new Error("Something is not wrong");

  const dataJSON: Promise<DayJSON> = data.json();

  return (await dataJSON).days;
};

export const useDays =  () => {
  return useQuery<SingleDay[], Error>(["days"], getDays);
};
