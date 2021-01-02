import { Meta, Story } from "@storybook/react/";
import { CheckButtonProps, CheckButton } from "./checkButton";

export default {
  title: "Component/Check Button",
  component: CheckButton,
} as Meta;

const Template: Story<CheckButtonProps> = (args) => {
  return (
    <div className="grid w-32 h-32 bg-black-main-normal place-items-center">
      <CheckButton {...args} />
    </div>
  );
};

export const Checked = Template.bind({});
Checked.args = {
    checked : true
}

export const NotChecked = Template.bind({})
NotChecked.args = {
    checked : false
}