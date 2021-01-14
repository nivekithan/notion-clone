import { Meta, Story } from "@storybook/react/types-6-0";
import { Menu, MenuProps } from "./menu";
// -------------------------------------------------------------------

export default {
  title: "Editor/Menu",
  component: Menu,
} as Meta;

const Template: Story<MenuProps> = (args) => <Menu {...args} />;

export const Math = Template.bind({});
Math.args = { queryString: "math", maxOption: 4 };

export const Heading = Template.bind({});
Heading.args = { queryString: "h", maxOption: 4 };
