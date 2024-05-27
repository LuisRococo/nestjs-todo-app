import React from "react";
import { cookies } from "next/headers";
import { getTask } from "@/actions/tasks";
import styles from "./styles.module.scss";
import NotFoundPage from "@/app/not-found";
import { Button, Container, Paper } from "@mui/material";
import Link from "next/link";
import { CiCalendar } from "react-icons/ci";
import TaskChip from "@/components/todo/TaskChip/TaskChip";
import { BsPencilSquare } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { ITask } from "@/app/interfaces/models/task";
import SubtaskCard from "@/components/todo/SubtaskCard/SubtaskCard";
import ReturnSection from "@/components/todo/ReturnSection/ReturnSection";

const Page = async ({ params }: { params: { taskId: number } }) => {
  const data = await getTask(cookies().get("token")!.value, params.taskId);

  if (data.status !== 200) return <NotFoundPage />;

  return (
    <Container maxWidth="xl">
      <div className="tw-flex tw-justify-center tw-items-center tw-mt-20 tw-flex-col">
        <div className={styles["return-section"]}>
          <ReturnSection url="/todo" />
        </div>

        <Paper elevation={3} className={styles.card}>
          <div className="tw-flex tw-justify-between">
            <TaskChip status={data.task.status} />

            <div className="tw-flex tw-justify-end tw-items-center tw-text-slate-400 tw-justify-items-center">
              <CiCalendar className="tw-mr-1 tw-text-xl" />
              <p className="tw-text-right tw-italic">{data.task.dueDate}</p>
            </div>
          </div>

          <h3 className="tw-font-bold tw-text-2xl tw-text-center">
            {data.task.title}
          </h3>

          <p className="tw-text-center tw-my-5">{data.task.description}</p>

          <div className="tw-flex tw-justify-center tw-gap-4">
            <Link href={"/"}>
              <Button startIcon={<MdDeleteOutline />} color="error">
                Delete
              </Button>
            </Link>

            <Link href={"/"}>
              <Button startIcon={<BsPencilSquare />}>Update</Button>
            </Link>
          </div>
        </Paper>
      </div>

      {data.task.children && data.task.children.length !== 0 && (
        <div className="tw-flex tw-items-center tw-mt-10 tw-flex-col">
          <h3 className="tw-text-2xl tw-font-bold tw-mb-5">Subtasks</h3>

          <div>
            {data.task.children.map((subtask: ITask) => (
              <SubtaskCard subtask={subtask} />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
};

export default Page;
