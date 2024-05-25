import React from "react";
import styles from "./styles.module.scss";
import { Container } from "@mui/material";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Container maxWidth="xl">
        <div className={styles["footer-content"]}>
          <p className="tw-font-bold tw-text-xl tw-mb-2">MY TODO APP</p>
          <p>@2024 | By Luis Roberto</p>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
