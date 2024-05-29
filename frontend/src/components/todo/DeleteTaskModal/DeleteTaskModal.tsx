import React, { FC } from "react";
import styles from "./styles.module.scss";
import { ITask } from "@/app/interfaces/models/task";
import { Box, Button, Modal, Typography } from "@mui/material";
import { IoWarningOutline } from "react-icons/io5";
import { deleteTask } from "@/actions/tasks";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface Props {
  /**
   * Task to be shown
   */
  task: ITask;
  open: boolean;
  handleClose: () => void;
}

/**
 * Modal for deleting a task.
 */
const DeleteTaskModal: FC<Props> = ({ handleClose, open, task }) => {
  const { push } = useRouter();

  const handleDelete = async () => {
    const response = await deleteTask(Cookies.get("token")!, task.id);

    if (response.status !== 200) {
      alert(response.data.message);
      handleClose();
      return;
    }

    push("/todo");
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.modal}>
        <div className="tw-flex tw-justify-center tw-mb-4">
          <IoWarningOutline className="tw-text-red-500 tw-text-5xl" />
        </div>

        <div className="tw-text-center">
          <p className="tw-font-bold tw-text-xl tw-mb-4">Are you sure?</p>
          <p className="tw-text-slate-500">This will delete the task</p>
        </div>

        <div className="tw-mt-5 tw-flex tw-flex-col tw-gap-2">
          <Button
            className="tw-w-full"
            color="error"
            variant="contained"
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button
            className="tw-w-full"
            variant="contained"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteTaskModal;
