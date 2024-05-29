import type { Meta, StoryObj } from "@storybook/react";

import BigTaskCard from "../../components/todo/BigTaskCard/BigTaskCard";
import { taskMock } from "../../mockData/tasksMocks";
import { formatDate } from "../../utils/utils";
import { TaskStatus } from "@/app/interfaces/models/task";

const meta: Meta<typeof BigTaskCard> = {
  title: "MyComponents/BigTaskCard",
  component: BigTaskCard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof BigTaskCard>;

export const TaskTodo: Story = {
  args: {
    task: { ...taskMock, dueDate: formatDate(new Date(taskMock.dueDate)) },
  },
};

export const TaskCompleted: Story = {
  args: {
    task: {
      ...taskMock,
      dueDate: formatDate(new Date(taskMock.dueDate)),
      status: TaskStatus.DONE,
    },
  },
};
