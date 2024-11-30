import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  
  const navigate = useNavigate(); // Hook to navigate to other pages

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // إرسال بيانات تسجيل الدخول إلى الخادم
      const res = await axios.post('http://127.0.0.1:5002/api/users/login', { username, password });
      setToken(res.data.token);

      console.log(res.data.token);
      alert('Login Successful');

      // إنشاء كائن يحتوي على بيانات المستخدم لإرساله
      const sendData = {
        username: username,
        password: password,
      };

      // التنقل إلى الصفحة الرئيسية وإرسال البيانات
      navigate('/home', { state: sendData });
    } catch (error) {
      console.error(error.response.data);
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h1>Hi, please log in</h1>
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
    </div>
  );
};

export default Login;
