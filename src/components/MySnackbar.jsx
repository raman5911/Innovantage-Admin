import { React, useState, forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MySnackbar(props) {
  const { open, setSnackbar, type, message } = { ...props };

  const handleClick = () => {
    setSnackbar(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar(false);
  };

  console.log('In Snackbar rendering fun !');

  return (
    <Snackbar open={open} autoHideDuration={4000} anchorOrigin={{ vertical: "top", horizontal: "right" }}  onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
