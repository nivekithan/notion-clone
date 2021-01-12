import { Meta, Story } from "@storybook/react/types-6-0";
import { MCQProps, MCQ } from "./mcq";

export default {
  title: "Editor/Questions/MCQ",
  component: MCQ,
} as Meta;

const Template: Story<MCQProps> = (args) => {

  return (
    <div className="grid w-full h-screen bg-black-main-normal place-items-center ">
      <div className="w-400-px bg-black-sidebar-normal max-w-400-px">
        <MCQ {...args} />
      </div>
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  question: [
    {
      type: "normal",
      children: [
        {
          text: "This is a question",
        },
      ],
    },
  ],
  answer: "one",
  four: [
    {
      type: "inline-math",
      children: [
        {
          text: "\\frac{4}{3}",
        },
      ],
    },
  ],
  one: [
    {
      type: "normal",
      children: [
        {
          text: "\\frac{3}{4}",
        },
      ],
    },
  ],
  three: [
    {
      type: "normal",
      children: [
        {
          text: "Haha This is fun",
        },
        {
          type: "inline-math",
          children: [
            {
              text: "\\sqrt{456}",
            },
          ],
        },
      ],
    },
  ],
  two: [
    {
      type: "normal",
      children: [
        {
          text: "\\frac{3}{4}",
        },
      ],
    },
  ],
  name: "question",
  isEditable : false
};
