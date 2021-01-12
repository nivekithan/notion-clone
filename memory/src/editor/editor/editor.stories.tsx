import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { Node } from "slate";
import { EditorProps, Editor } from "./editor";

export default {
  title: "Editor/Main Editor",
  component: Editor,
} as Meta;

const Template: Story<EditorProps> = (args) => <Editor {...args} />;

const defualtNode: Node[] = [
  {
    type: "normal",
    children: [
      {
        text: " ",
      },
    ],
  },
];

export const Primary = Template.bind({});
Primary.args = {
  defaultValue: defualtNode,
};

export const MCQ = Template.bind({});
MCQ.args = {
  defaultValue: [
    {
      type: "mcq",
      data: {
        answer: "one",
        isEditable: true,
        one: defualtNode,
        two: defualtNode,
        three: defualtNode,
        four: defualtNode,
        question: defualtNode,
      },
      children: [
        {
          text: "",
        },
      ],
    },
  ],
};
