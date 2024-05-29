import type { Meta, StoryObj } from "@storybook/react";

import { taskMock } from "../../mockData/tasksMocks";
import { Button } from "@mui/material";
import { useState } from "react";
import DeleteTaskModal from "@/components/todo/DeleteTaskModal/DeleteTaskModal";

const meta: Meta<typeof DeleteTaskModal> = {
  title: "MyComponents/DeleteTaskModal",
  tags: ["autodocs"],
  component: DeleteTaskModal,
};

export default meta;

type Story = StoryObj<typeof DeleteTaskModal>;

export const Interactive: Story = {
  args: {
    task: taskMock,
  },
  render: (props) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <DeleteTaskModal
          {...{ ...props, open, handleClose: () => setOpen(false) }}
        />
      </>
    );
  },
};
