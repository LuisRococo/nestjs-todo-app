"use client";

import { ITask } from "@/app/interfaces/models/task";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import React, { FC } from "react";
import TaskChip from "../../TaskChip/TaskChip";
import { useRouter } from "next/navigation";

interface Props {
  task: ITask;
}

const TaskCard: FC<Props> = ({ task }) => {
  const { push } = useRouter();

  const handleTaskCardClick = () => {
    push(`/todo/${task.id}`);
  };

  return (
    <div className="tw-mb-5">
      <Card sx={{ width: 300 }}>
        <CardActionArea onClick={handleTaskCardClick}>
          <CardContent>
            <div className="tw-mb-2">
              <TaskChip status={task.status} />
            </div>
            <Typography variant="h5" component="div">
              {task.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {task.children &&
                task.children.length > 0 &&
                `${task.children.length} subtasks`}
            </Typography>
            <Typography variant="body2">{task.description}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <div className="tw-ml-16 tw-mt-4">
        {task.children?.map((children) => (
          <TaskCard task={children} key={children.id} />
        ))}
      </div>
    </div>
  );
};

export default TaskCard;
