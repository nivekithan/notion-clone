import { Button, ButtonProps } from "./button";
import { Meta, Story } from "@storybook/react/types-6-0";

export default {
  title: "Component/button",
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => {
  return (
    <div className="grid h-12 w-28 bg-black-main-normal place-items-center">
      <Button {...args} />
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  label: "Submit",
};
