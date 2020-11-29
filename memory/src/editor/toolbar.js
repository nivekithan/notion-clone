import { useState, useEffect } from "react";
import { FaBold } from "react-icons/fa";
import { Editor } from "slate";
import { useSlate } from "slate-react";

export const MarkButton = ({ format, handleClick }) => {
  const editor = useSlate();
  const buttonUtility = ["cursor-pointer", "inline-block"];
  const marksActive =  Editor.marks(editor) && Editor.marks(editor)[format] && true;
  const [active, setActive] = useState(marksActive);

  switch (format) {
    case "bold":
      return (
        <div
          className={buttonUtility.join(" ")}
          onClick={(e) => {
            handleClick(e, format, editor);
          }}
        >
          <FaBold color={active ? "#FF0000" : "#0000A0"} />
        </div>
      );
    default:
      return null;
  }
};
