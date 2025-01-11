import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser, updateUser, addUser } from '../back/api';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  Box,
} from '@mui/material';
import { Delete, Edit, Save, Warning } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

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
    setUserToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    deleteUser(userToDelete).then(() => {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete));
      setDeleteDialogOpen(false);
      setUserToDelete(null);
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

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        TransitionComponent={Transition}
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center">
              <Warning color="error" style={{ marginRight: '8px' }} />
              <Typography variant="h6">Confirm Delete</Typography>
            </Box>
            <IconButton onClick={() => setDeleteDialogOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this user? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Users;