import { nanoid } from "nanoid";
import { Node } from "slate";
import { DoubleLinked, Ques } from "../../api/test";
import { SlateEditor } from "../../editor";
import { useUpdateTest } from "../../hooks";

// ---------------------------------------------------------------------------------------------------
type EditorClick = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  children: Node[]
) => void;

// ----------------------------------------------------------------------------------------------------
export const Editor = ({
  test,
  pageID,
  dayID,
}: {
  test: DoubleLinked<DoubleLinked<Ques>>;
  pageID: string;
  dayID: string;
}) => {
  const quesUpdate = useUpdateTest();

  const onSubmitAnswer: EditorClick = (e, nodes) => {
    e.preventDefault();
    const endElement = test.data[pageID].data.getEnd();
    endElement.element.data.ans = { children: nodes };

    quesUpdate.mutate({ id: dayID, data: test });
  };
  const onSubmitQues: EditorClick = (e, nodes) => {
    e.preventDefault();
    const id = nanoid();

    test.data[pageID].data.append(
      {
        type: "Ques and Answer",
        ques: { children: nodes },
        ans: { children: [] },
      },
      id
    );

    quesUpdate.mutate({ id: dayID, data: test });
  };

  return <SlateEditor onAnsClick={onSubmitAnswer} onQuesClick={onSubmitQues} />;
};
