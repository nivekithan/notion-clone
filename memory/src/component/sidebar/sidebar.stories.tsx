
import {Meta,Story} from "@storybook/react/types-6-0"
import {Sidebar, SidebarProps} from "./sidebar";



export default {
    title : "Sidebar/background",
    component : Sidebar
} as Meta

const Template : Story<SidebarProps> = (args) => <Sidebar {...args} />

export const Primary = Template.bind({});
const primaryChild = (
    <h1>I am here</h1>
)
Primary.args = {
    children : primaryChild
}

