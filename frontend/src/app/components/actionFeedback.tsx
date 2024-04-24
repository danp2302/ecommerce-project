"use client";
import React, { useContext } from "react";
import { Snackbar } from "@mui/material";
import { ActionFeedbackContext } from "../context/actionFeedbackContext";
import { Alert } from "@mui/material";

const ActionFeedback = () => {
  const { alert, setAlert } = useContext(ActionFeedbackContext);
  const handleClose = () => {
    setAlert((prevAlert) => ({
      ...prevAlert,
      open: false,
    }));
  };

  return (
    <>
      <Snackbar
        open={alert.open}
        autoHideDuration={alert.autoHideDuration}
        onClose={handleClose}
      >
        <Alert severity={alert.color}>{alert.message || ""}</Alert>
      </Snackbar>
    </>
  );
};

export default ActionFeedback;
