import { Fragment, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { createTest } from "../../api/test";
import { useQues } from "../../hooks";
import { DoubleLinked, Ques } from "../../api/test";
import { SlateEditor } from "../../editor";
// =====================================================
interface MatchParams {
  id: string;
}

interface TestComponentTypes extends RouteComponentProps<MatchParams> {}
// --------------------------------------------------------
export const TestComponent = ({ match }: TestComponentTypes) => {
  const allQuesQuery = useQues(match.params.id);

  if (allQuesQuery.isLoading) return <h1>Fetching .....</h1>;

  if (allQuesQuery.isError)
    return <h1>THere is some error {allQuesQuery.error.message}</h1>;

  if (allQuesQuery.isSuccess) {
    console.log("I am here");
    const { data } = allQuesQuery;

    const Test = createTest(data);

    return <PageComponent Test={Test} />;
  }

  return <h1>Something is wrong</h1>;
};

const PageComponent = ({
  Test,
}: {
  Test: DoubleLinked<DoubleLinked<Ques>>;
}) => {
  const [activePageID, setActivePageID] = useState(Test.start);
  if (!activePageID) {
    return null;
  }
  const pageOutput: JSX.Element[] = [];

  for (let ques of Test.data[activePageID].data) {
    const output: JSX.Element = (
      <section key={ques?.id}>
        <div></div>
        <div></div>
      </section>
    );
    pageOutput.push(output);
  }
  pageOutput.push(<SlateEditor key={'editor'} />);

  return <Fragment>{pageOutput}</Fragment>;
};
