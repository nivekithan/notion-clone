import { Node } from "slate";

import React from "react";
import { Editor } from "./editor";

export const App = () => {
  return (
    <div className="flex text-white-1 ">
      <div className="h-screen w-sidebar max-w-sidebar bg-black-sidebar"></div>
      <div className="flex-1 h-screen bg-black-content">
        <div className="mx-cent20 mt-cent10">
          <Editor defaultValue={defaultValue} />
        </div>
      </div>
    </div>
  );
};

const defaultValue: Node[] = [
  {
    type: "normal",
    children: [
      {
        text: "Hello this is new",
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
  {
    type: "number-list",
    children: [
      {
        type: "list-item",
        children: [
          {
            text: "This is first",
          },
        ],
      },
      {
        type: "list-item",
        children: [
          {
            text: "This is second",
          },
        ],
      },
    ],
  },
  {
    type: "bullet-list",
    children: [
      {
        type: "list-item",
        children: [
          {
            text: "This is first",
          },
        ],
      },
      {
        type: "list-item",
        children: [
          {
            text: "This is second",
          },
        ],
      },
    ],
  }
];
