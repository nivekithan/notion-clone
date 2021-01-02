import { Meta, Story } from "@storybook/react/types-6-0";

const Input = () => {
  return (
    <div className="flex items-center bg-black-input-normal shadow-input justif-center">
      <div
        contentEditable
        suppressContentEditableWarning
        className="inline-block px-2 py-10-px text-white-white w-400-px"
      >
        Hello
      </div>
      <button className="m-2 btn-blue" >Submit</button>
    </div>
  );
};

export default {
  title: "Checking/My Input",
  component: Input,
} as Meta;

const Template: Story<{}> = (args) => {
  return (
    <div className="flex items-center justify-center w-1/2 bg-black-main-normal h-96">
      <Input {...args} />
    </div>
  );
};

export const Primary = Template.bind({});
