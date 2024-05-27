import React from "react";
import { Container, Grid } from "@mui/material";
import ControlSection from "@/components/todo/ControlSection/ControlSection";
import Image from "next/image";
import laptopGirlImg from "../../images/undraw_laptop-girl.svg";
import TasksContainer from "@/components/todo/TasksContainer/TasksContainer";
import { TaskContext } from "@/context/taskContext";
import TaskPagination from "@/components/todo/TaskPagination/TaskPagination";

const Page = () => {
  return (
    <Container maxWidth="xl">
      <TaskContext>
        <ControlSection />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className="tw-flex tw-justify-center tw-mb-4">
              <TaskPagination />
            </div>

            <TasksContainer />
          </Grid>
          <Grid item xs={6}>
            <Image
              src={laptopGirlImg}
              width={700}
              height={700}
              style={{ width: "90%" }}
              alt="laptop girl"
            />
          </Grid>
        </Grid>
      </TaskContext>
    </Container>
  );
};

export default Page;
