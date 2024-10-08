"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import "./styles.css";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long, include uppercase and lowercase letters, and a number."
      );
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
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

  // Clear error when user starts typing a new password
  useEffect(() => {
    if (password.length > 0) {
      setError("");
    }
  }, [password]);

  return (
    <div className="signup-container">
      <div className="logo-container uk-margin">
        <img
          src="/logo.svg"
          alt="Profile Icon"
          className="uk-navbar-item uk-padding-small"
        />
      </div>
      <div className="signup-form-container">
        <h3 className="uk-text-large uk-text-center uk-text-emphasis">
          Join Nostra
        </h3>
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
          <div className="uk-flex uk-flex-center uk-flex-middle">
            <button
              type="submit"
              className="uk-button uk-button-primary uk-border-rounded"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign up"}
            </button>
          </div>
        </form>
        <p className="uk-text-center uk-margin-top">
          Already have an account?{" "}
          <Link href="/login" className="link-login">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
