"use client";

import React, { useContext } from "react";
import styles from "./styles.module.scss";
import { Button, Paper } from "@mui/material";
import FormInput from "@/components/FormInput";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { login } from "@/actions/auth";
import { CreatedAuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

interface FormValues {
  email: string;
  password: string;
}

const Page = () => {
  const { control, handleSubmit, resetField } = useForm<FormValues>();
  const { loadUser } = useContext(CreatedAuthContext);
  const { push } = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { email, password } = data;
    const response = await login({ email, password });

    if (response.status !== 200) {
      alert(response.message);
      resetField("password");
      return;
    }

    Cookies.set("token", response.token);

    if (loadUser) {
      await loadUser();
      push("/todo");
    }
  };

  return (
    <div className={styles.page}>
      <Paper elevation={3} className={styles.card}>
        <h3 className="tw-font-bold tw-text-2xl tw-text-center">Sign In</h3>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: { value: true, message: "This field cant be empty" },
            }}
            render={({ field, fieldState }) => (
              <FormInput
                label="Email"
                placeholder="Your email"
                Icon={MdEmail}
                fieldData={field}
                fieldState={fieldState}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: { value: true, message: "This field cant be empty" },
            }}
            render={({ field, fieldState }) => (
              <FormInput
                label="Password"
                placeholder="Your password"
                Icon={RiLockPasswordFill}
                fieldData={field}
                fieldState={fieldState}
                type="password"
              />
            )}
          />

          <Button
            type="submit"
            sx={{ marginTop: "10px" }}
            variant="contained"
            size="large"
          >
            Login
          </Button>
        </form>

        <div className="tw-flex tw-justify-center">
          <Link href={"/signup"}>
            <Button>Sign Up</Button>
          </Link>
        </div>
      </Paper>
    </div>
  );
};

export default Page;
