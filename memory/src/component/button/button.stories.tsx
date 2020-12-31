
import {Button,ButtonProps} from "./button";
import {Meta, Story} from "@storybook/react/types-6-0";


export default {
    title : "Component/button",
    component : Button
} as Meta

const Template : Story<ButtonProps>  = (args) => <Button {...args} />


export const Primary = Template.bind({})
Primary.args = {
    label : "Cake"
}
