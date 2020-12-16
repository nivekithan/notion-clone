import { QueryClient, useQuery, useQueryClient } from "react-query";
import { RouteComponentProps } from "react-router-dom";
import React, { useState } from "react";
import {useQues} from "../../hooks/useQues";

// =====================================================
interface MatchParams {
  id: string;
}

interface TestComponentTypes extends RouteComponentProps<MatchParams> {}

interface SingleQues {
  type: string;
  ques: {};
  ans: {};
}


// --------------------------------------------------------
export const TestComponent = ({ match }: TestComponentTypes) => {
  const [activeNo, setActiveNo] = useState<number>(0);
  const queryClient = useQueryClient();

  const allQuesQuery = useQues(match.params.id);

  if (allQuesQuery.isLoading) return <h1>Fetching .....</h1>;

  if (allQuesQuery.isError)
    return <h1>THere is some error {allQuesQuery.error.message}</h1>;

  const { data } = allQuesQuery;
  if (!data) return null;
  const activeQues: SingleQues[] = data.data[activeNo];
  

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        setActiveNo((num) => num++);
      }}
    >
      Hello{" "}
      {activeQues?.map((ques) => {
        return ques.type;
      })}
    </button>
  );
};
