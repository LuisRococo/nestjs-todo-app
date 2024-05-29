"use client";

import React, { FC, useState } from "react";
import styles from "./styles.module.scss";
import { Button, Paper } from "@mui/material";
import TaskChip from "../TaskChip/TaskChip";
import { CiCalendar } from "react-icons/ci";
import Link from "next/link";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { ITask } from "@/app/interfaces/models/task";
import DeleteTaskModal from "../DeleteTaskModal/DeleteTaskModal";

interface Props {
  task: ITask;
}

/**
 * Task Card for showing more info about a task
 */
const BigTaskCard: FC<Props> = ({ task }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <DeleteTaskModal
        task={task}
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
      />

      <Paper elevation={3} className={styles.card}>
        <div className="tw-flex tw-justify-between">
          <TaskChip status={task.status} />

          <div className="tw-flex tw-justify-end tw-items-center tw-text-slate-400 tw-justify-items-center">
            <CiCalendar className="tw-mr-1 tw-text-xl" />
            <p className="tw-text-right tw-italic">{task.dueDate.toString()}</p>
          </div>
        </div>

        <h3 className="tw-font-bold tw-text-2xl tw-text-center">
          {task.title}
        </h3>

        <p className="tw-text-center tw-my-5">{task.description}</p>

        <div className="tw-flex tw-justify-center tw-gap-4">
          <Button
            startIcon={<MdDeleteOutline />}
            color="error"
            onClick={() => setModalOpen(true)}
          >
            Delete
          </Button>

          <Link href={`/edit-task/${task.id}`}>
            <Button startIcon={<BsPencilSquare />}>Update</Button>
          </Link>
        </div>
      </Paper>
    </>
  );
};

export default BigTaskCard;
