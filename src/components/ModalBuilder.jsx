import { React, useState, forwardRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { DialogContentText } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import {
  AppBar,
  Toolbar,
  Typography,
  Slide,
  Grid,
} from "@mui/material";

export default function ModalBuilder(props) {
  const {
    open,
    handleOpen,
    handleClose,
    handleSubmit,
    title,
    content,
    buttonText,
  } = { ...props };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {title}
        {handleClose ? (
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent style={{ maxHeight: "480px" }} dividers>
        {content()}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleSubmit}>
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function DeleteModal(props) {
  const { open, handleClose, handleSubmit } = { ...props };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle color={"#d32f2f"} id="alert-dialog-title">
        {"Caution !"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Do you really want to proceed ? Data will be deleted permanently.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color="error" onClick={handleSubmit} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function FullScreenModal(props) {
  const {
    fullScreenModalOpen,
    handleFullScreenModalOpen,
    handleFullScreenModalClose,
    content,
  } = props;

  return (
    <div>
      <Dialog
        fullScreen
        open={fullScreenModalOpen}
        onClose={handleFullScreenModalClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleFullScreenModalClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              LR Details
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={handleFullScreenModalClose}
            >
              Close
            </Button>
          </Toolbar>
        </AppBar>

        <Grid style={{ padding: "2rem" }}>
          {content || ""}
        </Grid>
      </Dialog>
    </div>
  );
}
