import { RouteComponentProps } from "react-router-dom";
import { createTest } from "../../api/test";
import { useQues, useUpdateTest } from "../../hooks";

import { Page } from "./page";
// =====================================================
interface MatchParams {
  id: string;
}

// --------------------------------------------------------
export const TestComponent = ({ match }: RouteComponentProps<MatchParams>) => {
  const updateTest = useUpdateTest();
  const { id } = match.params;
  const quesQuery = useQues(id);

  if (quesQuery.isFetching) <h1>Fetching</h1>;
  if (quesQuery.isError) <h1>Some errror</h1>;
  if (quesQuery.isSuccess) {
    const { data } = quesQuery;
    const test = createTest(data);

    if (!data?.start) {
      updateTest.mutate({
        id,
        data: test,
      });
    }

    return <Page test={test} dayID={id} />;
  }
  return <h1>Working</h1>;
};
