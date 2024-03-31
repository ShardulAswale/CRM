import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";

import { orders } from "../db.json";

const PriorityEnum = {
  Low: 1,
  Medium: 2,
  High: 3,
  Urgent: 4,
};
// Define the descendingComparator function
function descendingComparator(a, b, orderBy) {
  let aValue = a[orderBy];
  let bValue = b[orderBy];

  // Extract numeric part of the ID for comparison
  if (orderBy === "customerId" || orderBy === "productId") {
    aValue = parseInt(aValue.substring(1));
    bValue = parseInt(bValue.substring(1));
    console.log(aValue, bValue);
  }

  if (orderBy === "priority") {
    aValue = PriorityEnum[aValue];
    bValue = PriorityEnum[bValue];
    console.log(aValue, bValue);
  }

  if (bValue < aValue) {
    return -1;
  }
  if (bValue > aValue) {
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

const Orders = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("orderId");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedOrders = React.useMemo(() => {
    return stableSort(orders, getComparator(order, orderBy));
  }, [order, orderBy]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="orders table">
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === "orderId"}
                direction={orderBy === "orderId" ? order : "asc"}
                onClick={() => handleRequestSort("orderId")}
              >
                ID
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "customerId"}
                direction={orderBy === "customerId" ? order : "asc"}
                onClick={() => handleRequestSort("customerId")}
              >
                Customer ID
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "productId"}
                direction={orderBy === "productId" ? order : "asc"}
                onClick={() => handleRequestSort("productId")}
              >
                Product ID
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "title"}
                direction={orderBy === "title" ? order : "asc"}
                onClick={() => handleRequestSort("title")}
              >
                Title
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "description"}
                direction={orderBy === "description" ? order : "asc"}
                onClick={() => handleRequestSort("description")}
              >
                Description
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "completed"}
                direction={orderBy === "completed" ? order : "asc"}
                onClick={() => handleRequestSort("completed")}
              >
                Completed
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "priority"}
                direction={orderBy === "priority" ? order : "asc"}
                onClick={() => handleRequestSort("priority")}
              >
                Priority
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "tags"}
                direction={orderBy === "tags" ? order : "asc"}
                onClick={() => handleRequestSort("tags")}
              >
                Tags
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedOrders.map((order) => (
            <TableRow key={order.orderId}>
              <TableCell>{order.orderId}</TableCell>
              <TableCell>{order.customerId}</TableCell>
              <TableCell>{order.productId}</TableCell>
              <TableCell>{order.title}</TableCell>
              <TableCell>{order.description}</TableCell>
              <TableCell>{order.completed}</TableCell>
              <TableCell>{order.priority}</TableCell>
              <TableCell>{order.tags.join(", ")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Orders;
