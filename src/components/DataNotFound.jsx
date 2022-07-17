import React from "react";
import { Box } from "@mui/material";

import NoData from "../assets/images/no_data.gif";

function DataNotFound(props) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      style={{ position: "relative", left: "15rem" }}
    >
      <img src={NoData} height="400" width="400" />
      <p style={{ marginTop: "-2.5rem", textAlign: "center", fontSize: "19px" }}>
        {" "}
        {props.message || "No Data Found"}
      </p>
    </Box>
  );
}

export default DataNotFound;
