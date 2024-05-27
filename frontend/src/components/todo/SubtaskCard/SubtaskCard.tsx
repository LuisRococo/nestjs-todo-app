import React, { FC } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { Paper } from "@mui/material";
import TaskChip from "../TaskChip/TaskChip";
import { FaArrowCircleRight } from "react-icons/fa";
import { ITask } from "@/app/interfaces/models/task";

interface Props {
  subtask: ITask;
}

const SubtaskCard: FC<Props> = ({ subtask }) => {
  return (
    <Link href={`/todo/${subtask.id}`}>
      <Paper elevation={2} className={styles.subtask}>
        <div className="tw-flex tw-items-center tw-gap-2">
          <TaskChip status={subtask.status} />
          <p className="tw-text-lg">{subtask.title}</p>
        </div>

        <FaArrowCircleRight className="tw-text-blue-500 tw-text-3xl" />
      </Paper>
    </Link>
  );
};

export default SubtaskCard;
