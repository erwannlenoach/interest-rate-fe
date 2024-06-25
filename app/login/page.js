// pages/auth.js
"use client";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useSearchParams } from 'next/navigation'; // Ensure correct import
import './styles.css';

const loginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const searchParams = useSearchParams();


  const handleLogin = async (e) => {
    e.preventDefault();
    const redirectPath = searchParams.get('redirect') || '/'; // Get redirect path from query params
    console.log(email, password, redirectPath);
    await login(email, password, redirectPath);
  };



  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1 className="uk-heading-medium uk-text-center">Login</h1>
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
          <button type="submit" className="uk-button uk-button-primary uk-width-1-1">
            Validate
          </button>
        </form>
      </div>
    </div>
  );
};

export default loginPage;
