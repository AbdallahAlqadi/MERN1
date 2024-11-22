import React, { useEffect, useState } from "react";
import { fetchUsers, posthUsers } from "../back/api";

function Home() {
  const [users, setUsers] = useState([]);

  // Fetch users when the component mounts
  useEffect(() => {
    const getUsers = async () => {
      const res = await fetchUsers();
      setUsers(res.data);
    };
    getUsers();
  }, []); // Empty dependency array to run only once when the component mounts

  // Log users when the state changes
  useEffect(() => {
    console.log(users); // This will log the updated users when the state changes
  }, [users]);

  // Function to send data
  const Senddata = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value;

    // Prepare user data as an object
    const userData = {
      name,
      password,
      phone,
    };

    // Send the data to the server
    try {
      const response = await posthUsers(userData);
      console.log(response); // Handle the server's response
    } catch (err) {
      console.error("Error sending data:", err); // Handle any errors
    }
  };

  return (
    <>
      <div style={{ marginLeft: "30px", fontSize: "xx-large", marginTop: "25px" }}>
        welcome
      </div>

      {/* Form element with onSubmit handler */}
      <form
        style={{
          backgroundColor: "black",
          width: "250px",
          height: "200px",
          paddingTop: "50px",
          marginLeft: "44%",
        }}
        onSubmit={Senddata} // Trigger Senddata when form is submitted
      >
        <input id="name" type="text" style={{ marginTop: "7%", height: "25px" }} placeholder="name" />
        <br />
        <input id="phone" type="tel" style={{ marginTop: "7%", height: "25px" }} placeholder="phone" />
        <br />
        <input id="password" type="text" style={{ marginTop: "7%", height: "25px" }} placeholder="password" />
        <br />
        <button
          type="submit" // Submit the form when clicked
          style={{
            marginTop: "7%",
            fontSize: "large",
            border: "none",
            borderRadius: "10px",
            padding: "5px",
            width: "100px",
          }}
        >
          Send
        </button>
      </form>

      {/* Display users if there are any */}
      {users.length > 0 && (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user._id} <br /> {user.phone}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Home;
