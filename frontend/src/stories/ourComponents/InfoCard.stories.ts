import type { Meta, StoryObj } from "@storybook/react";

import InfoCard from "../../components/home/CardsSection/InfoCard";
import { MdInsertEmoticon } from "react-icons/md";

const meta: Meta<typeof InfoCard> = {
  component: InfoCard,
  title: "MyComponents/InfoCard",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof InfoCard>;

export const Primary: Story = {
  args: {
    color: "#ff0000",
    title: "Title",
    description: "Description",
    Icon: MdInsertEmoticon,
  },
};
