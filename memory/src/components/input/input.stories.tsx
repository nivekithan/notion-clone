
import {Meta, Story} from "@storybook/react/types-6-0";
import {InputProps, Input} from "./input"


export default {
    title : "Component/Input",
    component : Input
} as Meta

const Template : Story<InputProps> = (args) => {
    return (
        <div>
            <Input {...args} />
        </div>
    )
} 

export const Primary = Template.bind({});
Primary.args = {
    defaultValue : "Something",
    placeholder : "Something"
}