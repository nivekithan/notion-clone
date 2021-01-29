import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { App, AppProps } from "./App";

export default {
  title: "Page",
  component: App,
} as Meta;

const Template : Story<AppProps> = (props) => <App {...props} />

export const Primary = Template.bind({});

Primary.args = {
    label: "This is storybook"
}
