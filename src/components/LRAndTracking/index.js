import { React, useState } from "react";
import { Grid, Typography, Button, Tab, Tabs, IconButton } from "@mui/material";

import LorryReceipt from "./LorryReceipt";
import MasterData from "./MasterData";
import Tracking from "./Tracking";

const LRMainComponent = () => {
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
          <Tab label="Customer Shipment Tracking" value="tracking" />
        </Tabs>
      </Grid>

      {value === "lr" && <LorryReceipt />}
      {value === "master" && <MasterData />}
      {value === "tracking" && <Tracking />}
    </>
  );
}

export default LRMainComponent;
