import { Ques } from "../../api/test";
import { serialiser } from "../../editor/serialiser";

export const QuesAndAnswer = ({ ques }: { ques: Ques }) => {
  if (ques.type === "Ques and Answer") {

    return (
      <section>
        <div>{serialiser(ques.ques)}</div>
        <div>{serialiser(ques.ans)}</div>
      </section>
    );
  } else {
      return null
  }
};
