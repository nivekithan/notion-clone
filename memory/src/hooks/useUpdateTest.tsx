import { useMutation, useQueryClient } from "react-query";
import { TestDB } from "../types";

const putTest = async ({ id, data }: { id: string; data: TestDB }) => {
  const url = "http://localhost:4000/put/test?id=" + id;

  const res = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json ; charset=utf-8",
    },
  });

  if (!res.ok) throw new Error("Something is wrong with useUpdateTest");

  const resJSON: Promise<{ data: TestDB }> = res.json();

  return (await resJSON).data;
};

export const useUpdateTest = () => {
  const queryClient = useQueryClient();

  return useMutation<
    TestDB,
    Error,
    { id: string; data: TestDB; stateFun?: () => void }
  >((d) => putTest(d), {
    onMutate: ({ stateFun }) => {
      if (stateFun) {
        stateFun();
      }
    },

    onSuccess: (d, { id }) => {
      queryClient.setQueryData(["tests", id], d);
    },
  });
};
