import { useMutation, useQueryClient } from "react-query";
import { DayJSON, SingleDay } from "./useDays";

// ------------------------------
export interface Data {
  name: string;
  tags: string;
}

// --------------------------------------------

const createDays = async ({ data }: { data: Data }) => {
  const { name, tags } = data;
  const tagList = tags.trim().split(";");

  const url = "http://localhost:4000/post/newgroup";

  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ name, tags: tagList }),
    headers: {
      "Content-type": "application/json ; charset=utf-8",
    },
  });

  if (!res.ok) throw new Error("Something is wrong");

  const dayJSON: Promise<DayJSON> = res.json();

  return (await dayJSON).days;
};

export const useCreateDays = () => {
  const queryClient = useQueryClient();

  return useMutation<SingleDay[], Error, { data: Data; stateFun?: () => void }>(
    (data) => createDays(data),
    {
      onMutate: ({ stateFun }) => {
        if (stateFun) {
          stateFun();
        }
      },

      onSuccess: (data) => {
        queryClient.setQueryData(["days"], data);
      },
    }
  );
};
