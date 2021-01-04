import {Meta, Story} from "@storybook/react/types-6-0";
import {MCQProps, MCQ} from "./mcq";


export default {
    title : "Editor/Questions/MCQ",
    component : MCQ
} as Meta


const Template : Story<MCQProps> = args => {
    return (
        <div className="grid w-full h-screen bg-black-main-normal place-items-center">
            <MCQ {...args} />
        </div>
    )
}

export const Primary = Template.bind({});
Primary.args = {
    question : "This is the question",
     answer : "one",
     four : "Something is something",
     one : "njkfkaf",
     three : "threee",
     two : '23465432'
}