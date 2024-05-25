import { TaskStatus } from "@/app/interfaces/models/task";
import React, { FC } from "react";
import styles from "./styles.module.scss";
import { Chip } from "@mui/material";

interface Props {
  status: TaskStatus;
}

const TaskChip: FC<Props> = ({ status }) => {
  const getStatusClass = () => {
    if (status === TaskStatus.DONE) {
      return styles["chip--done"];
    } else if (status === TaskStatus.IN_PROGRESS) {
      return styles["chip--progress"];
    } else {
      return styles["chip--todo"];
    }
  };

  return (
    <Chip className={`${styles.chip} ${getStatusClass()}`} label={status} />
  );
};

export default TaskChip;
