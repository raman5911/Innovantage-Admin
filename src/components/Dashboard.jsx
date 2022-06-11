import { React, useState } from "react";

import {
  Grid,
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import WatchLaterRoundedIcon from "@mui/icons-material/WatchLaterRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import DownloadIcon from "@mui/icons-material/Download";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import DeleteIcon from "@mui/icons-material/Delete";

import TableBuilder from "./TableBuilder";
import { format_date } from "../utils";

function Dashboard() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const MoreOptions = () => {
    return (
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <VisibilityIcon style={{ marginRight: "0.5rem" }} /> View
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <EditIcon style={{ marginRight: "0.5rem" }} /> Edit
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <EventAvailableIcon style={{ marginRight: "0.5rem" }} /> Change Status
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <WatchLaterIcon style={{ marginRight: "0.5rem" }} /> Manage Shipment
          Tracking
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <DeleteIcon style={{ marginRight: "0.5rem" }} /> Delete
        </MenuItem>
      </Menu>
    );
  };

  const tableHeaders = [
    "#",
    "Name",
    "Request Type",
    "Contact Number",
    "Email Address",
    "Status",
    "Received On",
    "Action",
  ];

  const rows = [
    {
      name: "Mark",
      type: "Freight Forwarding",
      phone: "3543553652",
      email: "abc@xyz.in",
      status: "Not Assigned",
      received_on: new Date(),
    },
    {
      name: "Jacob",
      type: "Value Added",
      phone: "3543553652",
      email: "abc@xyz.in",
      status: "Assigned",
      received_on: new Date(),
    },
    {
      name: "Larry",
      type: "Custom Clearance",
      phone: "3543553652",
      email: "abc@xyz.in",
      status: "Pending",
      received_on: new Date(),
    },
    {
      name: "Sam",
      type: "Warehouse Management",
      phone: "3543553652",
      email: "abc@xyz.in",
      status: "Assigned",
      received_on: new Date(),
    },
    {
      name: "John",
      type: "Value Added",
      phone: "3543553652",
      email: "abc@xyz.in",
      status: "Completed",
      received_on: new Date(),
    },
    {
      name: "Mark",
      type: "Freight Forwarding",
      phone: "3543553652",
      email: "abc@xyz.in",
      status: "Not Assigned",
      received_on: new Date(),
    },
    {
      name: "Jacob",
      type: "Value Added",
      phone: "3543553652",
      email: "abc@xyz.in",
      status: "Assigned",
      received_on: new Date(),
    },
    {
      name: "Larry",
      type: "Custom Clearance",
      phone: "3543553652",
      email: "abc@xyz.in",
      status: "Pending",
      received_on: new Date(),
    },
    {
      name: "Sam",
      type: "Warehouse Management",
      phone: "3543553652",
      email: "abc@xyz.in",
      status: "Assigned",
      received_on: new Date(),
    },
    {
      name: "John",
      type: "Value Added",
      phone: "3543553652",
      email: "abc@xyz.in",
      status: "Completed",
      received_on: new Date(),
    },
  ];

  const columns = [
    { key: "name" },
    { key: "type" },
    { key: "phone" },
    { key: "email" },
    {
      key: "status",
      render: true,
      renderValue: (row, key) => {
        return row[key];
      },
    },
    {
      key: "received_on",
      render: true,
      renderValue: (row, key) => {
        return format_date(row[key], "Asia/Kolkata", "dd-MMMM-yyyy");
      },
    },
    {
      key: "action",
      render: true,
      renderValue: (row, key) => {
        return (
          <IconButton color="primary" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Grid>
      <h4 className="sub-heading" style={{ marginTop: "-0.5rem" }}>
        Order Stats
      </h4>

      <Grid container>
        <Grid xl={3} lg={3} md={6} sm={12} style={{ margin: "0.5rem auto" }}>
          <Card sx={{ width: "270px" }}>
            <CardContent>
              <Typography style={{ padding: "0.5rem" }}>
                <HelpRoundedIcon
                  style={{
                    width: "25%",
                    height: "25%",
                    color: "rgba(95, 92, 92, 0.5)",
                  }}
                />
              </Typography>
              <Typography
                variant="h5"
                component="div"
                style={{ marginLeft: "0.5rem" }}
              >
                Not Assigned - 5
              </Typography>
            </CardContent>
            <CardActions>
              <Button>
                {" "}
                <DownloadIcon style={{ marginRight: "0.5rem" }} /> Generate
                Report
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid xl={3} lg={3} md={6} sm={12} style={{ margin: "0.5rem auto" }}>
          <Card sx={{ width: "270px" }}>
            <CardContent>
              <Typography style={{ padding: "0.5rem" }}>
                <AssignmentTurnedInRoundedIcon
                  style={{ width: "25%", height: "25%", color: "#00a2ff" }}
                />
              </Typography>
              <Typography
                variant="h5"
                component="div"
                style={{ marginLeft: "0.5rem" }}
              >
                Assigned - 30
              </Typography>
            </CardContent>
            <CardActions>
              <Button>
                {" "}
                <DownloadIcon style={{ marginRight: "0.5rem" }} /> Generate
                Report
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid xl={3} lg={3} md={6} sm={12} style={{ margin: "0.5rem auto" }}>
          <Card sx={{ width: "270px" }}>
            <CardContent>
              <Typography style={{ padding: "0.5rem" }}>
                <WatchLaterRoundedIcon
                  style={{ width: "25%", height: "25%", color: "#ffae00" }}
                />
              </Typography>
              <Typography
                variant="h5"
                component="div"
                style={{ marginLeft: "0.5rem" }}
              >
                Pending - 10
              </Typography>
            </CardContent>
            <CardActions>
              <Button>
                {" "}
                <DownloadIcon style={{ marginRight: "0.5rem" }} /> Generate
                Report
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid xl={3} lg={3} md={6} sm={12} style={{ margin: "0.5rem auto" }}>
          <Card sx={{ width: "270px" }}>
            <CardContent>
              <Typography style={{ padding: "0.5rem" }}>
                <CheckCircleRoundedIcon
                  style={{ width: "25%", height: "25%", color: "#67da36" }}
                />
              </Typography>
              <Typography
                variant="h5"
                component="div"
                style={{ marginLeft: "0.5rem" }}
              >
                Completed - 20
              </Typography>
            </CardContent>
            <CardActions>
              <Button>
                {" "}
                <DownloadIcon style={{ marginRight: "0.5rem" }} /> Generate
                Report
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <h4 className="sub-heading">Recent Queries</h4>

      <Grid>
        <TableBuilder
          tableHeaders={tableHeaders}
          rows={rows}
          columns={columns}
          autoNumbering={true}
        />
        <MoreOptions />
      </Grid>
    </Grid>
  );
}

export default Dashboard;
