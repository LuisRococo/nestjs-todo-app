import React from "react";
import styles from "./styles.module.scss";
import { Container } from "@mui/material";
import TaskForm from "@/components/TaskForm/TaskForm";
import ReturnSection from "@/components/todo/ReturnSection/ReturnSection";

const Page = () => {
  return (
    <Container maxWidth="lg" sx={{ height: "80vh" }}>
      <div className={styles.page}>
        <div className={styles["return-button-cont"]}>
          <ReturnSection />
        </div>

        <TaskForm />
      </div>
    </Container>
  );
};

export default Page;
