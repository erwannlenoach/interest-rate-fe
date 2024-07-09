"use client";

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import "./styles.css";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8800/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      setIsLoading(false);
      if (response.ok) {
        login(data.token);
      } else {
        setError(data.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Error signing up. Please try again later.");
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h1 className="uk-heading-medium uk-text-center">Sign Up</h1>
        {error && <div className="uk-alert-danger uk-margin">{error}</div>}
        <form onSubmit={handleSignup}>
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
          <button
            type="submit"
            className="uk-button uk-button-primary uk-width-1-1"
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Register"}
          </button>
        </form>
        <p className="uk-text-center uk-margin-top">
          Already have an account? <Link href="/login">Please log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
