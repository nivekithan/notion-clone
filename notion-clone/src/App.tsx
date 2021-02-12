import { nanoid } from "nanoid";
import React from "react";
import { Node } from "slate";
import { MainEditor } from "./editor";

export const App = () => {
  return (
    <div className="flex text-white-1 ">
      <div className="h-screen w-sidebar max-w-sidebar bg-black-sidebar"></div>
      <div className="flex-1 h-screen bg-black-content">
        <div className="mx-cent20 mt-cent10">
          <MainEditor defaultValue={defaultValue} />
        </div>
      </div>
    </div>
  );
};

const id = nanoid()

const defaultValue: Node[] = [
  {
    type: "number-list",
    id : id,
    startId : id,
    number: 1,
    children: [
      {
        text: "",
      },
    ],
  },
];
