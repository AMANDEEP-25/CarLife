// src/components/Login.jsx
import React, { useState } from "react";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;
function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${url}/api/auth/${isSignup ? "signup" : "login"}`,
        {
          username,
          password,
        }
      );
      if (isSignup) {
        alert("User created successfully. Please log in.");
        setIsSignup(false);
      } else {
        onLogin(response.data.token);
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="login">
      <h2>{isSignup ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
      </form>
      <button onClick={() => setIsSignup(!isSignup)}>
        {isSignup
          ? "Already have an account? Login"
          : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
}

export default Login;
