import React from "react";
import styles from "./styles.module.scss";
import { tasksMock } from "@/mockData/tasksMocks";
import TaskCard from "./TaskCard/TaskCard";

const TasksContainer = () => {
  const tasks = tasksMock;

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
