import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser, updateUser,adduser } from '../back/api';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TableSortLabel,
  TablePagination,
  TextField,
  IconButton,
  CircularProgress,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import { Delete, Edit, Save } from '@mui/icons-material';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [editUserId, setEditUserId] = useState(null);
  const [editUserData, setEditUserData] = useState({});

  useEffect(() => {
    fetchUsers().then((res) => {
      const updatedUsers = res.data.map((user) => ({
        id: user._id,
        name: user.username,
        phone: user.phone,
        roul: user.roul,
      }));
      setUsers(updatedUsers);
      setLoading(false);
    });
  }, []);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (id) => {
    deleteUser(id).then(() => {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    });
  };

  const handleEdit = (id) => {
    setEditUserId(id);
    const userToEdit = users.find((user) => user.id === id);
    setEditUserData(userToEdit);
  };

  const handleSave = () => {
    updateUser(editUserId, editUserData)
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === editUserId ? { ...user, ...editUserData } : user
          )
        );
        setEditUserId(null);
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  const handleInputChange = (e, field) => {
    setEditUserData({ ...editUserData, [field]: e.target.value });
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (orderBy === 'name') {
      return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    }
    return 0;
  });

  return (
    <>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      <TextField
        label="Search by Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <TableContainer component={Paper}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sortDirection={orderBy === 'name' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleRequestSort('name')}
                  >
                    Username
                  </TableSortLabel>
                </TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      {editUserId === user.id ? (
                        <TextField
                          value={editUserData.name}
                          onChange={(e) => handleInputChange(e, 'name')}
                        />
                      ) : (
                        user.name
                      )}
                    </TableCell>
                    <TableCell>
                      {editUserId === user.id ? (
                        <TextField
                          value={editUserData.phone}
                          onChange={(e) => handleInputChange(e, 'phone')}
                        />
                      ) : (
                        user.phone
                      )}
                    </TableCell>
                    <TableCell>
                      {editUserId === user.id ? (
                        <Select
                          value={editUserData.roul}
                          onChange={(e) => handleInputChange(e, 'roul')}
                          fullWidth
                        >
                          <MenuItem value="Admin">Admin</MenuItem>
                          <MenuItem value="User">User</MenuItem>
                        </Select>
                      ) : (
                        user.roul
                      )}
                    </TableCell>
                    <TableCell>
                      {editUserId === user.id ? (
                        <Button
                          color="primary"
                          startIcon={<Save />}
                          onClick={handleSave}
                        >
                          Save
                        </Button>
                      ) : (
                        <IconButton color="primary" onClick={() => handleEdit(user.id)}>
                          <Edit />
                        </IconButton>
                      )}
                      <IconButton
                        color="secondary"
                        onClick={() => handleDelete(user.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default Users;   