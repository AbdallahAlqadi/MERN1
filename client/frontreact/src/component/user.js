import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../back/api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

function Users() {
    const [user,setUser]=useState([])
    var users = [
        { id: 1, name: 'JohnDoe', year: 'Watch, Belt', price: 120 },
        { id: 2, name: 'JaneSmith', year: 'Bag, Shoes', price: 200 },
        { id: 3, name: 'AliceJones', year: 'Ring, Necklace', price: 300 },
      ];
useEffect(()=>{
    fetchUsers().then(res=>{
        const formcarupdated=res.data.map(user=>({
            id:users._id,
            name:user.name,
           

        }))
      
users=formcarupdated
setUser(formcarupdated)
    })
},[])

  


  return (
    <>
      <Typography variant="h4" gutterBottom>
        Order Page
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>car ID</TableCell>
              <TableCell>carname</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>roul</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.name}</TableCell>
           

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" align="right" marginTop={2}>
      </Typography>
    </>
  );
}

export default Users;