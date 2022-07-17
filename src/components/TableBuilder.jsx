import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TableBuilder = (props) => {
  const { tableHeaders, rows, columns, autoNumbering, height } = {...props};

  return (
    <>
      <TableContainer component={Paper} style={{ maxHeight: `${height !== undefined ? height : '320px'}`, marginTop: "1rem" }}>
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHeaders.map((header) => {
                return <TableCell>{header}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <>
                <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    hover
                >
                    {autoNumbering === true && <TableCell>{index + 1}</TableCell>}

                    {columns.map((col, index) => {
                      return (
                      <>
                        <TableCell key={index + 1}>{col.render !== undefined && col.render === true ? col.renderValue(row, col.key) : row[col.key] }</TableCell>
                      </>);
                    })}

                </TableRow>
            </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>      
    </>
  );
};

export default TableBuilder;