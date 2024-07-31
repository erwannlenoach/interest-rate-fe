"use client";

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import "./styles.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
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
      <div className="logo-container uk-margin" >
        <img
          src="/logo.svg"
          alt="Profile Icon"
          className="uk-navbar-item uk-padding-small"
        />
      </div>
      <div className="login-form-container">
      <h3 className="uk-text-large uk-text-center uk-text-emphasis">
          Log in to your account
        </h3>
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
          <div className="uk-flex uk-flex-center uk-flex-middle">
            <button
              type="submit"
              className="uk-button uk-button-primary button-rounded"
            >
              Log in
            </button>
          </div>
        </form>
        <div>
          <p className="uk-text-center uk-margin-top">
            You don't have an account yet?{" "}
            <Link href="/signup">Please sign up</Link>
          </p>
          <p className="uk-text-center uk-margin-top">
            Forgot your password?{" "}
            <Link href="/forgot-password">Reset your password</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
