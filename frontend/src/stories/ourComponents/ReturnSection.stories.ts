import type { Meta, StoryObj } from "@storybook/react";

import ReturnSection from "../../components/todo/ReturnSection/ReturnSection";

const meta: Meta<typeof ReturnSection> = {
  component: ReturnSection,
  title: "MyComponents/ReturnSection",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ReturnSection>;

export const Primary: Story = {
  args: {},
};

export const CustomTextAndUrl: Story = {
  args: {
    text: "Custom text",
    url: "/custom-url",
  },
};
