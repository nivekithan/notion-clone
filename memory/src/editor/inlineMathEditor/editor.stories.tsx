
import { Meta, Story } from "@storybook/react/types-6-0"
import {InlineEditorProps, InlineEditor} from "./index";

// ----------------------------------------
export default {
    title : "Editor/inline",
    component : InlineEditor
} as Meta

const Template : Story<InlineEditorProps> = (args) => <InlineEditor {...args} />

export const InlineMath = Template.bind({});
InlineMath.args = {
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