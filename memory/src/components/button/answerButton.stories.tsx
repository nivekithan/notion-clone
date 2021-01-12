import { Meta, Story } from "@storybook/react/types-6-0";
import { AnswerButton, AnswerButtonProps } from "./answerButton";

export default {
  title: "Component/Answer Button",
  component: AnswerButton,
} as Meta;

const Template: Story<AnswerButtonProps> = (args) => {
  return (
    <div className="grid h-12 w-28 bg-black-main-normal place-items-center">
      <AnswerButton {...args} />
    </div>
  );
};

export const YesAnswer = Template.bind({});
YesAnswer.args = {
  isAnswer: true,
  onClick: (e) => {
    e.preventDefault();
    console.log(e.currentTarget.innerText);
  },
};

export const NoAnswer = Template.bind({});

NoAnswer.args = {
  ...YesAnswer.args,
  isAnswer: false,
};
