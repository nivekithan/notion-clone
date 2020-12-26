import { Fragment, useState } from "react";
import { DoubleLinked, Ques } from "../../api/test";
import { Editor } from "./editor";
import { QuesAndAnswer } from "./quesAndAnswer";

export const Page = ({
  test,
  dayID,
}: {
  test: DoubleLinked<DoubleLinked<Ques>>;
  dayID: string;
}) => {
  const [activePageID, setActivePageID] = useState(test.start);

  if (!activePageID) return <h1>Something is wrong</h1>;

  const eachPage: JSX.Element[] = [];

  for (let ques of test.data[activePageID].data) {
    if (!ques) {
      eachPage.push(<Fragment></Fragment>);
      continue;
    }
    eachPage.push(<QuesAndAnswer ques={ques.data} key={ques.id} />);
  }

  return (
    <Fragment>
      {eachPage}
      <Editor dayID={dayID} pageID={activePageID} test={test} key={"Editor"} />
    </Fragment>
  );
};
