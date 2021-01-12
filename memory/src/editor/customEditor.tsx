import { Editor, Node } from "slate";
import { ReactEditor } from "slate-react";

// --------------------------------------------------
export const CustomEditor = {
  ...ReactEditor,

  insertEditor(editor: Editor) {
    const defualtNode = [
      {
        type: "normal",
        children: [
          {
            text: "",
          },
        ],
      },
    ];

    const NewMCQ : Node = {
      type : "mcq",
      data : {
        answer : "one",
        isEditable : true,
        one : defualtNode,
        two : defualtNode,
        three : defualtNode,
        four : defualtNode,
        question : defualtNode
      },
      children : [
        {
          text : ""
        }
      ]
    }
  },
};
