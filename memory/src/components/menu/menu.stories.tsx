import { Meta, Story } from "@storybook/react/types-6-0";
import { SingleOption, SingleOptionProps } from "./menu";
// -------------------------------------------------------------------

// -------------------------------------------------------------------
export default {
  title: "Editor/Menu",
  component: SingleOption,
} as Meta;

const Template: Story<SingleOptionProps> = (args) => <SingleOption {...args} />;

export const Single = Template.bind({});
Single.args = {
  name: "This some really long name",
  label: "This is a label",
};
