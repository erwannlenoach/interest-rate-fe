// pages/auth.js
"use client";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'; // Ensure correct import
import './styles.css';

const loginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter()

  const login = async (email, password) => {
    try {
      const response = await fetch(
        "http://localhost:8800/api/users/connexion",
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
        sessionStorage.setItem("token", JSON.stringify(data));
        router.push('/profile'); 
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }



  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
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
