
import {Meta,Story} from "@storybook/react/types-6-0"
import { Fragment } from "react";
import {Sidebar, SidebarProps} from "./sidebar";
import {SingleMenu, SingleMenuProps} from "./singleMenu"

export default {
    title : "Sidebar/background",
    component : Sidebar
} as Meta

const Template : Story<SidebarProps> = (args) => <Sidebar {...args} />

export const Primary = Template.bind({});
const primaryChild = (
    <Fragment>
        <SingleMenu label={"First ones"} onMenuClick={(e) => e.preventDefault()} />
        <SingleMenu label={"Second one"} onMenuClick={(e) => e.preventDefault()} />
        <SingleMenu  label={"Third one"} onMenuClick={(e) => e.preventDefault()} />
    </Fragment>
)
Primary.args = {
    children : primaryChild
}

