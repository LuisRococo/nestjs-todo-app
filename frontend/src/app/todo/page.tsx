import React from "react";
import styles from "./styles.module.scss";
import { Container, Grid } from "@mui/material";
import ControlSection from "@/components/todo/ControlSection/ControlSection";
import Image from "next/image";
import laptopGirlImg from "../../images/undraw_laptop-girl.svg";
import TasksContainer from "@/components/todo/TasksContainer/TasksContainer";

const Page = () => {
  return (
    <Container maxWidth="xl">
      <ControlSection />

      <Grid container spacing={2}>
        <Grid item xs={6}>
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
    </Container>
  );
};

export default Page;
