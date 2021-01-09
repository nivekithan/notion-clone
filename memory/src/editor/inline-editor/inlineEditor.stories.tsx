import { Meta, Story } from "@storybook/react/types-6-0";
import { InlineEditor, InlineEditorProps } from "./inlineEditor";
import { SerialiseInlineEditor } from "./serializer";

export default {
  title: "Editor/Inline Editor",
  component: InlineEditor,
} as Meta;

const Template: Story<InlineEditorProps> = (args) => <InlineEditor {...args} />;

export const Inline = Template.bind({});
Inline.args = {
  defaultValue: [
    {
      type: "inline-math",
      children: [
        {
          text: "\\frac{3}{4}",
        },
      ],
    },
  ],
};

export const Block = Template.bind({});
Block.args = {
  defaultValue: [
    {
      type: "block-math",
      children: [
        {
          text: "\\frac{3}{4}",
        },
      ],
    },
  ],
};

export const Text = Template.bind({});
Text.args = {
  defaultValue: [
    {
      type: "normal",
      children: [
        {
          text: "Tadata",
        },
      ],
    },
  ],
};

export const Serialiser: Story<InlineEditorProps> = (args) => {
  return (
    <div className="bg-black-main-normal">
      <SerialiseInlineEditor
        node={{
          children: [
            {
              type: "normal",
              children: [
                {
                  text: "thats why I like you",
                },
                {
                  type: "inline-math",
                  children: [
                    {
                      text: "\\frac{3}{4}",
                    },
                  ],
                },
              ],
            },
          ],
        }}
      />
    </div>
  );
};
