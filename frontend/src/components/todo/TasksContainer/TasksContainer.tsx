"use client";

import React, { useContext } from "react";
import TaskCard from "./TaskCard/TaskCard";
import { CreatedTaskContext } from "@/context/taskContext";

const TasksContainer = () => {
  const { tasks } = useContext(CreatedTaskContext);

  return (
    <div className="tw-border-solid tw-border tw-border-slate-200 tw-rounded tw-p-5 tw-overflow-auto tw-mb-10">
      {tasks.length === 0 && (
        <p className="tw-text-center tw-italic tw-text-slate-400">No Tasks</p>
      )}

      {tasks.length !== 0 &&
        tasks.map((task, index) => <TaskCard task={task} key={index} />)}
    </div>
  );
};

export default TasksContainer;
