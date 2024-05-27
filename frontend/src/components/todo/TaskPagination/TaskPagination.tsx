"use client";

import { CreatedTaskContext } from "@/context/taskContext";
import { Pagination } from "@mui/material";
import React, { useContext } from "react";

const TaskPagination = () => {
  const { page, setPage, totalPages } = useContext(CreatedTaskContext);

  return (
    <Pagination
      page={page}
      count={totalPages}
      color="primary"
      onChange={(e, newValue) => {
        setPage(newValue);
      }}
    />
  );
};

export default TaskPagination;
