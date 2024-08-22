"use client";

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import "./styles.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    setError(""); 

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
      setIsLoading(false); // Stop loading
      if (response.ok) {
        login(data.token);
      } else {
        setError(data.message || "Invalid email or password."); // Set error message
      }
    } catch (error) {
      setIsLoading(false); // Stop loading
      setError("An error occurred. Please try again."); // Set error message
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container uk-margin">
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
        {error && <div className="uk-alert-danger uk-margin">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="uk-margin">
            <input
              type="email"
              className="uk-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="uk-margin">
            <input
              type="password"
              className="uk-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="uk-flex uk-flex-center uk-flex-middle">
            <button
              type="submit"
              className="uk-button uk-button-primary uk-border-rounded"
              disabled={isLoading} 
            >
              {isLoading ? "Logging in..." : "Log in"} {/* Show loading text */}
            </button>
          </div>
        </form>
        <div>
          <p className="uk-text-center uk-margin-top">
            You don't have an account yet?{" "}
            <Link href="/signup" className="link-login">Sign up</Link>
          </p>
          <p className="uk-text-center uk-margin-top">
            Forgot your password?{" "}
            <Link href="/forgot-password" className="link-login">Reset your password</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
