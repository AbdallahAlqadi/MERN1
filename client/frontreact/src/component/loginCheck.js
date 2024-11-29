import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate(); // Hook to navigate to other pages

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:5002/api/users/login', { username, password });
      setToken(res.data.token);
      console.log(res.data.token);
      alert('Login Successful');
      navigate('/home'); // Redirect to Home after successful login
    } catch (error) {
      console.error(error.response.data);
      alert('Invalid username or password');
    }
  };

  return (
    <>
      <h1>Hi, please log in</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
