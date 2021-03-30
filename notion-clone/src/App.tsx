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
        text: "Hello World!",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit saepe atque laboriosam? Quaerat aspernatur inventore hic officia! Ea, sed inventore.",
      },
    ],
  },
];
