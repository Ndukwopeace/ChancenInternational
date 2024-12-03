import '../../style/authstyles/register.css';
import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });

      const { role } = response.data;

      // Navigate based on user role
      if (role === 'student') {
        navigate('/student/student-dashboard'); // Navigate to student page
      } else if (role === 'admin') {
        navigate('/admin/admin-dashboard'); // Navigate to admin page
      }

      // Optionally, you might want to store the token in local storage or context
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error(err);
    }
  };

  return (
    <div className="login">
      <div className="form-box">
        <form className="form" onSubmit={handleSubmit}>
          <span className="title">Sign in</span>
          <span className="subtitle">Please fill the Form.</span>
          <div className="form-container">
            <input
              type="email"
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error">** {error} **</p>}
          <button type="submit">Sign in</button>
        </form>
        <div className="form-section">
          <p>Don't have an account? <NavLink to="/auth/register">Sign up</NavLink></p>
        </div>
      </div>
    </div>
  );
};

export default Login;