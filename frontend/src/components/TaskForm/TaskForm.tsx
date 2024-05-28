"use client";

import React, { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Button, Paper } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import FormInput from "../FormInput";
import { MdDateRange, MdOutlineTitle } from "react-icons/md";
import FormSelect, { FormSelectItem } from "../FormSelect";
import { createTask, getUserTasks, updateTask } from "@/actions/tasks";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { formatDate, taskToFormSelectItems } from "@/utils/utils";
import { ITask, TaskStatus } from "@/app/interfaces/models/task";
import Loading from "@/app/loading";

interface FormValues {
  title: string;
  description: string;
  dueDate: string;
  parentTask: number | "none";
}

interface Props {
  task?: ITask;
}

const TaskForm: FC<Props> = ({ task }) => {
  const editMode = !!task;
  const { control, handleSubmit } = useForm<FormValues>();
  const { back, push, refresh } = useRouter();
  const [selectTasks, setSelectTask] = useState<FormSelectItem[]>([]);

  const getInitialDataParentTask = () => {
    if (task) {
      return task.parentTaskId ? task.parentTaskId : "none";
    }

    return "none";
  };

  const initialData: {
    title: string;
    description: string;
    dueDate: string;
    parentTask: number | "none";
  } = {
    title: task?.title || "",
    description: task?.description! || "",
    dueDate: task?.dueDate! || formatDate(new Date()),
    parentTask: getInitialDataParentTask(),
  };

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

    let result;

    if (editMode) {
      result = await updateTask(Cookies.get("token")!, task.id, taskData);
    } else {
      result = await createTask(Cookies.get("token")!, taskData);
    }

    if (result.status !== 200) {
      alert(result.data.message);
      return;
    }

    push("/todo");
    refresh();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Paper elevation={3} className={styles.card}>
        <h3 className="tw-font-bold tw-text-2xl tw-text-center">
          {editMode ? "Edit Task" : "Create Task"}
        </h3>

        {selectTasks.length === 0 && <Loading />}

        {selectTasks.length !== 0 && (
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Controller
              name="title"
              control={control}
              defaultValue={initialData.title}
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
              defaultValue={initialData.description}
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
              defaultValue={initialData.dueDate}
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
              defaultValue={initialData.parentTask}
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
              {editMode ? "Edit" : "Create"}
            </Button>
          </form>
        )}
      </Paper>
    </>
  );
};

export default TaskForm;
