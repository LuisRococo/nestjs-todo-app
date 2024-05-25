"use client";

import { Button, Paper } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import FormInput from "@/components/FormInput";
import { IoPerson } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import { signup } from "@/actions/auth";
import { useRouter } from "next/navigation";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const page = () => {
  const { handleSubmit, control } = useForm<FormValues>();
  const { push } = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const result = await signup(data);

    if (result.status !== 201) {
      alert(result.message);
      return;
    }

    push("/login");
  };

  return (
    <div className={styles.page}>
      <Paper elevation={3} className={styles.card}>
        <h3 className="tw-font-bold tw-text-2xl tw-text-center">Sign Up</h3>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            rules={{
              required: { value: true, message: "This field cant be empty" },
            }}
            render={({ field, fieldState }) => (
              <FormInput
                label="First Name"
                placeholder="Your first name"
                Icon={IoPerson}
                fieldData={field}
                fieldState={fieldState}
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            rules={{
              required: { value: true, message: "This field cant be empty" },
            }}
            render={({ field, fieldState }) => (
              <FormInput
                label="Last Name"
                placeholder="Your last name"
                Icon={IoPerson}
                fieldData={field}
                fieldState={fieldState}
              />
            )}
          />

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
            Sign Up
          </Button>
        </form>

        <div className="tw-flex tw-justify-center">
          <Link href={"/login"}>
            <Button>Login</Button>
          </Link>
        </div>
      </Paper>
    </div>
  );
};

export default page;
