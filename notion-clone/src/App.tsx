import React, { useState } from "react";
import { Node } from "slate";
import { Editor } from "./editor";

export const App = () => {
  const [value, setValue] = useState(initialValue);

  return <Editor onChange={setValue} value={value} />;
};

const initialValue: Node[] = [
  {
    type: "title",
    children: [
      {
        text: "Title",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text:
          "Paragraph - Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit saepe atque laboriosam? Quaerat aspernatur inventore hic officia! Ea, sed inventore.",
      },
    ],
  },
  {
    type: "heading-1",
    children: [
      {
        text: "Heading 1",
      },
    ],
  },
  {
    type: "heading-2",
    children: [
      {
        text: "Heading 2",
      },
    ],
  },
  {
    type: "heading-3",
    children: [
      {
        text: "Heading 3",
      },
    ],
  },
];
