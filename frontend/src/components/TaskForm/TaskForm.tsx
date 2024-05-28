"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Button, Paper } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import FormInput from "../FormInput";
import { MdDateRange, MdOutlineTitle } from "react-icons/md";
import FormSelect, { FormSelectItem } from "../FormSelect";
import { createTask, getUserTasks } from "@/actions/tasks";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { formatDate, taskToFormSelectItems } from "@/utils/utils";
import { TaskStatus } from "@/app/interfaces/models/task";

interface FormValues {
  title: string;
  description: string;
  dueDate: string;
  parentTask: number | "none";
}

const TaskForm = () => {
  const { control, handleSubmit } = useForm<FormValues>();
  const { back, push } = useRouter();
  const [selectTasks, setSelectTask] = useState<FormSelectItem[]>([]);

  const init = async () => {
    const result = await getUserTasks(Cookies.get("token")!, null, "all");

    if (!result) {
      alert("There was an error loading parent tasks options");
      back();
      return;
    }

    const tasksSelectItems = taskToFormSelectItems(result.tasks);
    setSelectTask(tasksSelectItems);
  };

  const onSubmit = async (formValues: FormValues) => {
    const parentTask =
      formValues.parentTask !== "none" ? formValues.parentTask : null;
    const taskData = {
      title: formValues.title,
      description: formValues.description,
      dueDate: formValues.dueDate,
      status: TaskStatus.TODO,
      parentTask,
    };

    const result = await createTask(Cookies.get("token")!, taskData);

    if (result.status !== 201) {
      alert(result.data.message);
      return;
    }

    push("/todo");
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Paper elevation={3} className={styles.card}>
      <h3 className="tw-font-bold tw-text-2xl tw-text-center">Create Task</h3>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          rules={{
            required: { value: true, message: "This field cant be empty" },
          }}
          render={({ field, fieldState }) => (
            <FormInput
              label="Title"
              placeholder="Task's title"
              Icon={MdOutlineTitle}
              fieldData={field}
              fieldState={fieldState}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          defaultValue=""
          rules={{
            required: { value: true, message: "This field cant be empty" },
          }}
          render={({ field, fieldState }) => (
            <FormInput
              label="Description"
              placeholder="Task's description"
              Icon={MdOutlineTitle}
              fieldData={field}
              fieldState={fieldState}
            />
          )}
        />

        <Controller
          name="dueDate"
          control={control}
          defaultValue={formatDate(new Date())}
          rules={{
            required: { value: true, message: "This field cant be empty" },
          }}
          render={({ field, fieldState }) => (
            <FormInput
              label="Due Date"
              placeholder="Task's due date"
              Icon={MdDateRange}
              fieldData={field}
              fieldState={fieldState}
              type="date"
            />
          )}
        />

        <Controller
          name="parentTask"
          control={control}
          defaultValue={"none"}
          render={({ field, fieldState }) => (
            <FormSelect
              label="Parent Task"
              fieldData={field}
              fieldState={fieldState}
              values={selectTasks}
            />
          )}
        />

        <Button
          type="submit"
          sx={{ marginTop: "10px" }}
          variant="contained"
          size="large"
        >
          Create
        </Button>
      </form>
    </Paper>
  );
};

export default TaskForm;
