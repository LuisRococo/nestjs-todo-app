"use client";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import React, { useContext } from "react";
import { IoMdAdd } from "react-icons/io";
import { TaskStatus } from "@/app/interfaces/models/task";
import { CreatedTaskContext } from "@/context/taskContext";
import Link from "next/link";

const ControlSection = () => {
  const { status, setStatus } = useContext(CreatedTaskContext);

  return (
    <div className="tw-py-10">
      <div className="tw-flex tw-justify-end tw-items-stretch">
        <FormControl sx={{ minWidth: 120, marginRight: 1 }}>
          <InputLabel id="status-select">Status</InputLabel>
          <Select
            labelId="status-select"
            label="Status"
            value={status}
            onChange={(newState) => {
              setStatus(newState.target.value as TaskStatus);
            }}
          >
            <MenuItem value={"all"}>
              <em>All</em>
            </MenuItem>
            <MenuItem value={TaskStatus.TODO}>To Do</MenuItem>
            <MenuItem value={TaskStatus.IN_PROGRESS}>In Progress</MenuItem>
            <MenuItem value={TaskStatus.DONE}>Done</MenuItem>
          </Select>
        </FormControl>

        <Link href={"/new-task"} style={{ display: "block" }}>
          <Button
            style={{ height: "100%" }}
            variant="outlined"
            startIcon={<IoMdAdd />}
          >
            Add task
          </Button>
        </Link>
      </div>

      <hr className="tw-mt-4" />
    </div>
  );
};

export default ControlSection;
