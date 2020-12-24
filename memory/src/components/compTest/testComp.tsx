import { Fragment, useCallback, useMemo, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { createTest } from "../../api/test";
import { useQues, useUpdateTest } from "../../hooks";
import { DoubleLinked, Ques } from "../../api/test";
import { SlateEditor } from "../../editor";
import { ButtonClick } from "../../types";
import { useSlate } from "slate-react";
import { nanoid } from "nanoid";
import { Node } from "slate";
// =====================================================
interface MatchParams {
  id: string;
}

interface TestComponentTypes extends RouteComponentProps<MatchParams> {}
// --------------------------------------------------------
export const TestComponent = ({ match }: TestComponentTypes) => {
  const allQuesQuery = useQues(match.params.id);
  const createTest_ = useCallback((data) => createTest(data), []);

  if (allQuesQuery.isLoading) return <h1>Fetching .....</h1>;

  if (allQuesQuery.isError)
    return <h1>THere is some error {allQuesQuery.error.message}</h1>;

  if (allQuesQuery.isSuccess) {
    const { data } = allQuesQuery;

    const Test = createTest_(data);

    return <PageComponent Test={Test} id={match.params.id} />;
  }

  return <h1>Something is wrong</h1>;
};

const PageComponent = ({
  Test,
  id,
}: {
  Test: DoubleLinked<DoubleLinked<Ques>>;
  id: string;
}) => {
  const [activePageID, setActivePageID] = useState(Test.start);
  if (!activePageID) {
    return null;
  }
  const pageOutput: JSX.Element[] = [];
  if (!Test.data[activePageID]) return <h1>There is no active page id</h1>;

  const onQuesClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    children: Node[]
  ) => {
    e.preventDefault();
    const quesID = nanoid();
    Test.data[id].data.append(
      { type: "Something", ques: children, ans: {} },
      quesID
    );

    
  };

  const onAnsClick: ButtonClick = (e) => {
    e.preventDefault();
    console.log("Clicked on Ans");
  };

  for (let ques of Test.data[activePageID].data) {
    const output: JSX.Element = (
      <section key={ques?.id}>
        <div></div>
        <div></div>
      </section>
    );
    pageOutput.push(output);
  }
  pageOutput.push(
    <SlateEditor
      key={"editor"}
      onQuesClick={onQuesClick}
      onAnsClick={onAnsClick}
    />
  );
  return <Fragment>{pageOutput}</Fragment>;
};
