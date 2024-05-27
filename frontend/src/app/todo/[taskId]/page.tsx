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
import BigTaskCard from "@/components/todo/BigTaskCard/BigTaskCard";

const Page = async ({ params }: { params: { taskId: number } }) => {
  const data = await getTask(cookies().get("token")!.value, params.taskId);

  if (data.status !== 200) return <NotFoundPage />;

  return (
    <Container maxWidth="xl">
      <div className="tw-flex tw-justify-center tw-items-center tw-mt-20 tw-flex-col">
        <div className={styles["return-section"]}>
          <ReturnSection url="/todo" />
        </div>

        <BigTaskCard task={data.task} />
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
