import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";

import { customers } from "../db.json";

// Sample customer data
// const customers = [
//   { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890" },
//   {
//     id: 2,
//     name: "Jane Smith",
//     email: "jane@example.com",
//     phone: "987-654-3210",
//   },
//   // Add more customer objects as needed
// ];

// Define the descendingComparator function
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// Define the getComparator function
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Define the stableSort function
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const Customers = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("customerId");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedCustomers = React.useMemo(() => {
    return stableSort(customers, getComparator(order, orderBy));
  }, [order, orderBy]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customer table">
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === "customerId"}
                direction={orderBy === "customerId" ? order : "asc"}
                onClick={() => handleRequestSort("customerId")}
              >
                ID
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "name"}
                direction={orderBy === "name" ? order : "asc"}
                onClick={() => handleRequestSort("name")}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "email"}
                direction={orderBy === "email" ? order : "asc"}
                onClick={() => handleRequestSort("email")}
              >
                Email
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "phone"}
                direction={orderBy === "phone" ? order : "asc"}
                onClick={() => handleRequestSort("phone")}
              >
                Phone
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedCustomers.map((customer) => (
            <TableRow key={customer.customerId}>
              <TableCell>{customer.customerId}</TableCell>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Customers;
