// pages/auth.js
"use client";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const loginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = () => {
    // Replace with your auth logic
    const userData = { email }; // example user data
    login(userData);
  };

  return (
    <div className="uk-container uk-margin-top">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="uk-margin">
          <input
            type="email"
            className="uk-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="uk-margin">
          <input
            type="password"
            className="uk-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" className="uk-button uk-button-primary" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default loginPage;
