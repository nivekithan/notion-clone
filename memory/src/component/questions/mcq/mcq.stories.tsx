import { Meta, Story } from "@storybook/react/types-6-0";

import {MCQProps, MCQ} from "./mcq"

export default {
    title : "Questions/mcq",
    component : MCQ
} as Meta

const Template : Story<MCQProps> = (args) => <MCQ {...args} /> 