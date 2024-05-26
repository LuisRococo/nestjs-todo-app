import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { Button } from "@mui/material";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles["hero-content"]}>
        <h2 className="tw-font-bold tw-text-6xl tw-mb-6">Hello there</h2>

        <div className="tw-font-normal tw-text-xl tw-mb-8">
          <p className="tw-mb-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </p>
          <p className="tw-mb-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta!
          </p>
          <p className="tw-mb-2">Lorem ipsum dolor sit amet.</p>
        </div>

        <Link href={"/todo"}>
          <Button size="large" variant="contained">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
