
import { Meta, Story } from "@storybook/react"
import {MCQProps, MCQ} from "./mcq"

export default {
    title : "Editor/mcq",
    component : MCQ
} as Meta

const Template : Story<MCQProps> = (args) => {

    return (
        <div className="grid w-32 h-32 place-items-center bg-black-main-normal" >
            <MCQ {...args} />
        </div>
    )
}

export const Primary = Template.bind({});
Primary.args = {
    answer : "one",
    
}