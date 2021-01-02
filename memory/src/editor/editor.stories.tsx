import { Meta, Story } from "@storybook/react/types-6-0";
import { Editor } from "./editor";

export default {
  title: "Editor",
  component: Editor,
} as Meta;

const Template: Story<{}> = (args) => <Editor {...args} />;

export const Primary = Template.bind({});
