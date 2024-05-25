import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import React from "react";
import { IoMdAdd } from "react-icons/io";
import { TaskStatus } from "@/app/interfaces/models/task";

const ControlSection = () => {
  return (
    <div className="tw-py-10">
      <div className="tw-flex tw-justify-end">
        <FormControl sx={{ minWidth: 120, marginRight: 1 }}>
          <InputLabel id="status-select">Status</InputLabel>
          <Select labelId="status-select" label="Status" value={"All"}>
            <MenuItem value="All">
              <em>All</em>
            </MenuItem>
            <MenuItem value={TaskStatus.TODO}>To Do</MenuItem>
            <MenuItem value={TaskStatus.IN_PROGRESS}>In Progress</MenuItem>
            <MenuItem value={TaskStatus.DONE}>Done</MenuItem>
          </Select>
        </FormControl>

        <Button variant="outlined" startIcon={<IoMdAdd />}>
          Add task
        </Button>
      </div>

      <hr className="tw-mt-4" />
    </div>
  );
};

export default ControlSection;
