import { React, useState } from "react";
import { Grid, Typography, Button, Tab, Tabs, IconButton } from "@mui/material";

import AddIcon from '@mui/icons-material/Add';

import TableBuilder from "../components/TableBuilder";

function lrComponent() {
  return (
    <Grid container style={{ marginTop: "2rem" }}>
      <Grid item xl={10} lg={10} md={12} sm={12}>
        <h4 className="sub-heading" style={{ marginTop: "-0.5rem" }}>
          Lorry Receipts
        </h4>
      </Grid>
      <Grid item xl={2} lg={2} md={12} sm={12}>
        <Button variant="contained">Create New <IconButton style={{ color: "#fff", height: "10px", marginLeft: "0.5rem" }} > <AddIcon /> </IconButton> </Button>
      </Grid>

      <Grid>
      <TableBuilder
          rows={[]}
          tableHeaders={[
            "#",
            "Job Role",
            "Location",
            "Experience Min",
            "Experience Max",
            "Application Deadline",
            "Job Url",
            "Created On",
            "Action",
          ]}
        //   columns={[
        //     { key: "position" },
        //     { key: "location" },
        //     {
        //       key: "experience_min",
        //       render: true,
        //       renderValue: (row, key) => {
        //         return `${row[key]} Years`;
        //       },
        //     },
        //     {
        //       key: "experience_max",
        //       render: true,
        //       renderValue: (row, key) => {
        //         return `${row[key]} Years`;
        //       },
        //     },
        //     {
        //       key: "application_deadline",
        //       render: true,
        //       renderValue: (row, key) => {
        //         return format_date(row[key], "Asia/Kolkata", "dd-MMMM-yyyy");
        //       },
        //     },
        //     {
        //       key: "post_link",
        //       render: true,
        //       renderValue: (row, key) => {
        //         return <a href={`${row[key]}`} target="_blank">{row[key]}</a>;
        //       },
        //     },
        //     {
        //       key: "created_on",
        //       render: true,
        //       renderValue: (row, key) => {
        //         return format_date(row[key], "Asia/Kolkata", "dd-MMMM-yyyy");
        //       },
        //     },
        //     {
        //       key: "action",
        //       render: true,
        //       renderValue: (row, key) => {
        //         return (
        //           <IconButton
        //             color="primary"
        //             onClick={(event) => {
        //               handleClick(event, row);
        //             }}
        //           >
        //             <MoreVertIcon />
        //           </IconButton>
        //         );
        //       },
        //     },
        //   ]}
          autoNumbering={true}
          height={"auto"}
        />
      </Grid>
    </Grid>
  );
}

function LorryReceipt() {
  const [value, setValue] = useState("lr");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Master Data" value="master" />
          <Tab label="Lorry Receipt" value="lr" />
        </Tabs>
      </Grid>

      {value === "lr" && lrComponent()}
    </>
  );
}

export default LorryReceipt;
