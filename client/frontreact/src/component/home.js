import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { fetchUsers, adduser, deleteUser } from "../back/api";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Home() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedUser(null);
    setOpen(false);
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetchUsers();
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to fetch users.");
      }
    };
    getUsers();
  }, []);

  const addUserHandler = async (e) => {
    e.preventDefault();

    const username = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    const user = { username, phone, password };

    try {
      const res = await adduser(user);
      if (res.status === 200) {
        alert("User added successfully!");
        setUsers((prevUsers) => [...prevUsers, user]);
      } else {
        alert("Failed to add user!");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Error occurred while adding the user.");
    }
  };

  const deleteUserHandler = async (id) => {
    try {
      const res = await deleteUser(id);
      if (res.status === 200) {
        alert("User deleted successfully!");
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      } else {
        alert(`Failed to delete user! Status: ${res.status}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error occurred while deleting the user.");
    }
  };

  const saveUpdatedUser = () => {
    const updatedUser = {
      ...selectedUser,
      username: document.getElementById("upname").value,
      phone: document.getElementById("upphone").value,
      password: document.getElementById("uppassword").value,
    };

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      )
    );

    handleClose();
    alert("User updated successfully!");
  };


    const location = useLocation();
    const { username, password } = location.state || {};


  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        backgroundColor: "#f4f4f9",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333" }}>
        Welcome to User Manager
      </h1>

      <form
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          width: "330px",
          margin: "20px auto",
        }}
        onSubmit={addUserHandler}
      >
        <h3
          style={{ textAlign: "center", marginBottom: "15px", color: "#444" }}
        >
          Add New User
        </h3>
        <input
          id="name"
          type="text"
          style={{
            width: "90%",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          placeholder="Name"
        />
        <input
          id="phone"
          type="tel"
          style={{
            width: "90%",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          placeholder="Phone"
        />
        <input
          id="password"
          type="text"
          style={{
            width: "90%",
            marginBottom: "15px",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          placeholder="Password"
        />
        <button
          type="submit"
          style={{
            width: "80%",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "10px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Add User
        </button>
      </form>

      {users.length > 0 && (
        <div style={{ maxWidth: "600px", margin: "20px auto" }}>
          <h3 style={{ textAlign: "center", color: "#555" }}>Users List</h3>
          <ul style={{ listStyle: "none", padding: "0" }}>
            {users.map((user) => (
              <li
                key={user._id}
                style={{
                  backgroundColor: "#fff",
                  marginBottom: "10px",
                  padding: "15px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <strong>UserName:</strong> {user.username} <br />
                  <strong>Phone:</strong> {user.phone}
                </div>
                <button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "8px 12px",
                    cursor: "pointer",
                  }}
                  onClick={() => deleteUserHandler(user._id)}
                >
                  Delete
                </button>
                <Button onClick={() => handleOpen(user)}>Update</Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
              }}
            >
              <input
                id="upname"
                type="text"
                defaultValue={selectedUser?.username || ""}
                placeholder="Name"
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  fontSize: "16px",
                }}
              />
              <input
                id="upphone"
                type="number"
                defaultValue={selectedUser?.phone || ""}
                placeholder="Phone"
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  fontSize: "16px",
                }}
              />
              <input
                id="uppassword"
                type="text"
                defaultValue={selectedUser?.password || ""}
                placeholder="Password"
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  fontSize: "16px",
                }}
              />
              <button
                type="button"
                onClick={saveUpdatedUser}
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  padding: "10px",
                  borderRadius: "5px",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
            </Box>
          </Typography>
        </Box>
      </Modal>


      <div>
      <h1>Welcome to Home Page</h1>
      <p>Username: {username}</p>
      <p>Password: {password}</p>
    </div>

    </div>
  );
}

export default Home;
