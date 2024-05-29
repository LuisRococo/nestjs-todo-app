import type { Meta, StoryObj } from "@storybook/react";

import TaskCard from "../../components/todo/TasksContainer/TaskCard/TaskCard";
import { taskWithChildrenMock, taskMock } from "../../mockData/tasksMocks";
import { TaskStatus } from "@/app/interfaces/models/task";

const meta: Meta<typeof TaskCard> = {
  title: "MyComponents/TaskCard",
  component: TaskCard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TaskCard>;

export const TaskTodo: Story = {
  args: {
    task: taskMock,
  },
};

export const TaskCompleted: Story = {
  args: {
    task: { ...taskMock, status: TaskStatus.DONE },
  },
};

export const TaskInProgress: Story = {
  args: {
    task: { ...taskMock, status: TaskStatus.IN_PROGRESS },
  },
};

export const TaskWithChildren: Story = {
  args: {
    task: taskWithChildrenMock,
  },
};
