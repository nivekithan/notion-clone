import { nanoid } from "nanoid";
import React, { useState, useMemo, useEffect, useLayoutEffect } from "react";
import { Node } from "slate";
import { MainEditor } from "./editor";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Devtools } from "./editor/devtools/devtools";
import {withDepth, withIds, withNumber,} from "./editor/plugins"
import {withReact} from "slate-react";
import {createEditor} from "slate"

export const App = () => {

  const editor = useMemo(
    () => withDepth(withNumber(withIds(withReact(createEditor())))),
    []
  );
  const [slateValue, setSlateValue] = useState<Node[]>(defaultValue);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="flex text-white-1 ">
            <div className="min-h-screen w-sidebar max-w-sidebar bg-black-sidebar"></div>
            <div className="flex-1 min-h-screen bg-black-content">
              <div className="mx-cent20 mt-cent10 pb-cent10">
                <MainEditor slateValue={slateValue} setSlateValue={setSlateValue} editor={editor} />
              </div>
            </div>
          </div>
        </Route>
        <Route exact path="/devtools">
          <Devtools slateValue={slateValue} setSlateValue={setSlateValue} />
        </Route>
      </Switch>
    </Router>
  );
};

const id = nanoid();

const defaultValue: Node[] = [
  {
    type: "normal",
    children: [
      {
        text: "p",
      },
    ],
  },
  {
    type: "number-list",
    id: id,
    startId: id,
    number: 1,
    depth: 0,
    children: [
      {
        text: "",
      },
    ],
  },
];

const secondDefault : Node[] = [
  {
    type: "normal",
    children: [
      {
        text: "2",
      },
    ],
  },
 
];