interface DataJSON {
  name: String;
  _id: String;
  days: {
    tags: String[];
    _id: string;
    name: String;
    group_id: String;
  }[];
}

export const getDays = async () => {
  const url = "http://localhost:4000/get/days";

  const data = await fetch(url);

  if (!data.ok) throw new Error("Something is not wrong");

  const dataJSON: Promise<DataJSON> = data.json();

  return (await dataJSON).days;
};
