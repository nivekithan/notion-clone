import { Meta, Story } from "@storybook/react/types-6-0";
import { InlineEditor, InlineEditorProps } from "./inlineEditor";

export default {
  title: "Editor/Inline Editor",
  component: InlineEditor,
} as Meta;

const Template: Story<InlineEditorProps> = (args) => <InlineEditor {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  defaultValue : [
    {
      type : "inline-math",
      children : [
        {
          text : "\\frac{3}{4}"
        }
      ]
    }
  ]
}