"use client";

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import './styles.css';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8800/api/connexion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        login(data.token);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
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
        <p className="uk-text-center uk-margin-top">
          You don't have an account yet? <Link href="/signup">Please sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
