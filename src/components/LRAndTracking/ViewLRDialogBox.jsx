import { React, useState, forwardRef } from "react";
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { format_date, get_time_from_date } from "../../utils";

function ViewLRDialogBox(props) {
  const { data } = props;

  console.log(data);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableBody>
          <TableRow hover>
            <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                LR Number
            </TableCell>
            <TableCell>
                {data.lr_number}
            </TableCell>
          </TableRow>

          <TableRow hover>
            <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                Date
            </TableCell>
            <TableCell>
                {format_date(data.date, "Asia/Kolkata", "dd-MMMM-yyyy")}
            </TableCell>
          </TableRow>

          <TableRow hover>
            <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                Vehicle Number
            </TableCell>
            <TableCell>
                {data.vehicle_number}
            </TableCell>
          </TableRow>

          <TableRow hover>
            <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                Vehicle Type
            </TableCell>
            <TableCell>
                {data.vehicle_type}
            </TableCell>
          </TableRow>

          <TableRow hover>
            <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                Driver's Mobile Number
            </TableCell>
            <TableCell>
                {data.driver_mobile}
            </TableCell>
          </TableRow>

          <TableRow hover>
            <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                Consignor From Name
            </TableCell>
            <TableCell>
                {data.consignor_name}
            </TableCell>
          </TableRow>

          <TableRow hover>
            <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                Consignor From Building Number
            </TableCell>
            <TableCell>
                {data.consignor_building_no}
            </TableCell>
          </TableRow>

          <TableRow hover>
            <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                Consignor From Street
            </TableCell>
            <TableCell>
                {data.consignor_street}
            </TableCell>
          </TableRow>

          <TableRow hover>
            <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                Consignor From City
            </TableCell>
            <TableCell>
                {data.consignor_city}
            </TableCell>
          </TableRow>

          <TableRow hover>
            <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                Consignor From Pincode
            </TableCell>
            <TableCell>
                {data.consignor_pincode}
            </TableCell>
          </TableRow>

          <TableRow hover>
            <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                Consignee To Name
            </TableCell>
            <TableCell>
                {data.consignee_name}
            </TableCell>
          </TableRow>

          <TableRow hover>
            <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                Consignee To Building Number
            </TableCell>
            <TableCell>
                {data.consignee_building_no}
            </TableCell>
          </TableRow>

          <TableRow hover>
            <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                Consignee To Street
            </TableCell>
            <TableCell>
                {data.consignee_street}
            </TableCell>
          </TableRow>

          <TableRow hover>
            <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                Consignee To City
            </TableCell>
            <TableCell>
                {data.consignee_city}
            </TableCell>
          </TableRow>

          <TableRow hover>
            <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                Consignee To Pincode
            </TableCell>
            <TableCell>
                {data.consignee_pincode}
            </TableCell>
          </TableRow>

          <TableRow hover>
            <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                Way Bill
            </TableCell>
            <TableCell>
                {data.way_bill}
            </TableCell>
          </TableRow>

          <TableRow hover>
            <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                GST Number
            </TableCell>
            <TableCell>
                {data.gst_number}
            </TableCell>
          </TableRow>

          <TableRow hover>
            <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                Special Instructions
            </TableCell>
            <TableCell>
                {data.special_instructions}
            </TableCell>
          </TableRow>

          <TableRow hover>
            <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                Contact Person
            </TableCell>
            <TableCell>
                {data.contact_person}
            </TableCell>
          </TableRow>

          <TableRow hover>
            <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                Vehicle Reporting Date
            </TableCell>
            <TableCell>
                {format_date(data.vehicle_reporting_date, "Asia/Kolkata", "dd-MMMM-yyyy")}
            </TableCell>
          </TableRow>

          <TableRow hover>
            <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                Vehicle Reporting Time
            </TableCell>
            <TableCell>
                {get_time_from_date(data.vehicle_reporting_time)}
            </TableCell>
          </TableRow>

          <TableRow hover>
            <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                Vehicle Departure Date
            </TableCell>
            <TableCell>
                {format_date(data.vehicle_departure_date, "Asia/Kolkata", "dd-MMMM-yyyy")}
            </TableCell>
          </TableRow>

          <TableRow hover>
            <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                Vehicle Departure Time
            </TableCell>
            <TableCell>
                {get_time_from_date(data.vehicle_departure_time)}
            </TableCell>
          </TableRow>

          <TableRow hover>
            <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                Driver's Name
            </TableCell>
            <TableCell>
                {data.driver_name}
            </TableCell>
          </TableRow>

          <TableRow hover>
            <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                Driver's License Number
            </TableCell>
            <TableCell>
                {data.driver_license_number}
            </TableCell>
          </TableRow>

          <TableRow hover>
            <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                Number of Packages
            </TableCell>
            <TableCell>
                {data.num_of_packages}
            </TableCell>
          </TableRow>

          <TableRow hover>
            <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                Description of Goods
            </TableCell>
            <TableCell>
                {data.goods_description}
            </TableCell>
          </TableRow>

          <TableRow hover>
            <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                Actual Weight
            </TableCell>
            <TableCell>
                {data.actual_weight}
            </TableCell>
          </TableRow>

          <TableRow hover>
            <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                Amount in Figures
            </TableCell>
            <TableCell>
                {data.amount_in_figures}
            </TableCell>
          </TableRow>

          <TableRow hover>
            <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                Amount in Words
            </TableCell>
            <TableCell>
                {data.amount_in_words}
            </TableCell>
          </TableRow>

          <TableRow hover>
            <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                Document Number
            </TableCell>
            <TableCell>
                {data.document_number}
            </TableCell>
          </TableRow>

          <TableRow hover>
            <TableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
                Document Date
            </TableCell>
            <TableCell>
                {format_date(data.document_date, "Asia/Kolkata", "dd-MMMM-yyyy")}
            </TableCell>
          </TableRow>

        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ViewLRDialogBox;
