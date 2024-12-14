import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css"; // Import the new CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Check if the user is already logged in
  useEffect(() => {
    const loggedInEmail = localStorage.getItem("loggedInEmail");
    if (loggedInEmail) {
      // Redirect to the UserList page
      window.location.href = "/users";
    }
  }, []); // Run only once on component mount

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });

      // Save email in localStorage after successful login
      localStorage.setItem("loggedInEmail", email);
      alert("Login successful!");
      // Redirect to Users List page
      window.location.href = "/users";
    } catch (error) {
      console.error("Error during login:", error);
      alert("Invalid login credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
