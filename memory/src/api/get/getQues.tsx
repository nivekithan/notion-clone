// ---------------------------------------------------------------------------------------------

// domain/get/grpQue?day_id=${}
export const getQues = async (day_id: string) => {
  const url = `http://localhost:4000/get/grpQue?day_id=${day_id}`;
  const data = await fetch(url);

  if (!data.ok) throw new Error("Something is wrong");
  return data.json();
};
