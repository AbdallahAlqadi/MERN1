import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

function Orders() {
  // Example data
  const orders = [
    { id: 1, username: 'JohnDoe', items: 'Watch, Belt', price: 120 },
    { id: 2, username: 'JaneSmith', items: 'Bag, Shoes', price: 200 },
    { id: 3, username: 'AliceJones', items: 'Ring, Necklace', price: 300 },
  ];

  // Calculate total price
  const totalPrice = orders.reduce((acc, order) => acc + order.price, 0);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Order Page
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Price ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.username}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>{order.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" align="right" marginTop={2}>
        Total Price: ${totalPrice}
      </Typography>
    </>
  );
}

export default Orders;