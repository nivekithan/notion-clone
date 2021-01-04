

import { Meta, Story } from "@storybook/react/types-6-0";
import React ,{} from "react";
import {EditorProps, Editor} from "./editor";

export default {
    title : "Editor/Main Editor",
    component : Editor
} as Meta   

const Template : Story<EditorProps> = (args) => <Editor {...args} />


export const Primary = Template.bind({});
 