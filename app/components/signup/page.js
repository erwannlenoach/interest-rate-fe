"use client";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from 'next/navigation';
import './styles.css';

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // Assuming you might want to log in the user after signup
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8800/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Optionally, log in the user after successful signup
        await login(username, password, '/'); // Redirect to home or another page after signup
      } else {
        console.error(data.message); // Handle error response
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h1 className="uk-heading-medium uk-text-center">Signup</h1>
        <form onSubmit={handleSignup}>
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
              type="text"
              className="uk-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
