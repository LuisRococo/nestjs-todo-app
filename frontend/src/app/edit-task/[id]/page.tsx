import React from "react";
import { cookies } from "next/headers";
import styles from "./styles.module.scss";
import { Container } from "@mui/material";
import TaskForm from "@/components/TaskForm/TaskForm";
import ReturnSection from "@/components/todo/ReturnSection/ReturnSection";
import NotFoundPage from "@/app/not-found";
import { getTask } from "@/actions/tasks";

const Page = async ({ params }: { params: { id: number } }) => {
  const data = await getTask(cookies().get("token")!.value, params.id);

  if (data.status !== 200) return <NotFoundPage />;

  return (
    <Container maxWidth="lg" sx={{ height: "80vh" }}>
      <div className={styles.page}>
        <div className={styles["return-button-cont"]}>
          <ReturnSection />
        </div>

        <TaskForm task={data.task} />
      </div>
    </Container>
  );
};

export default Page;
