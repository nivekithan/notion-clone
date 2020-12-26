import { useMutation, useQueryClient } from "react-query";
import { Data } from "./useCreateDays";
import { SingleDay, DayJSON } from "./useDays";

const updataDays = async ({ data, day_id }: { data: Data; day_id: string }) => {
  const body = {
    name: data.name,
    tags: data.tags.trim().split(";"),
  };

  const url = "http://localhost:4000/put/day?id=" + day_id;

  const res = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json ; charset=utf-8",
    },
  });

  if (!res.ok) throw new Error("Somthing is wrong in useUpdateDays hook");

  const resJSON: Promise<DayJSON> = res.json();

  return (await resJSON).days;
};

export const useUpdateDays = () => {
  const queryClient = useQueryClient();

  return useMutation<SingleDay[], Error, { data: Data; day_id: string, stateFunc ? : () => void }>(
    (d) => updataDays(d),
    {
        onMutate: ({stateFunc}) => {
            if (stateFunc) {
                stateFunc()
            }
        },

      onSuccess: (d) => {
        queryClient.setQueryData(["days"], d);
      },
    }
  );
};
