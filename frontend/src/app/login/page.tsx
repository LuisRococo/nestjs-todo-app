import React from "react";
import styles from "./styles.module.scss";
import { Button, Paper } from "@mui/material";
import FormInput from "@/components/FormInput";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

const Page = () => {
  return (
    <div className={styles.page}>
      <Paper elevation={2} className={styles.card}>
        <h3 className="tw-font-bold tw-text-2xl tw-text-center">Sign In</h3>

        <form className={styles.form}>
          <FormInput label="Email" placeholder="Email..." Icon={MdEmail} />
          <FormInput
            label="Password"
            placeholder="Password..."
            Icon={RiLockPasswordFill}
          />

          <Button sx={{ marginTop: "10px" }} variant="contained" size="large">
            Submit
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Page;
