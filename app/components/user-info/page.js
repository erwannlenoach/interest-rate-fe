"use client";

import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./styles.css";

const UserInfo = ({ user }) => {
  const [newPassword, setNewPassword] = useState("");

  const [username, setUsername] = useState(user.username);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const handleUpdateUsername = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.patch(
        "http://localhost:8800/api/username/edit",
        { username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoading(false);
      if (!response.data.success) {
        setError("Update failed. Please try again.");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Error updating username. Please try again later.");
      console.error("Error updating username:", error);
    }
  };
  

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.patch(
        "http://localhost:8800/api/password/edit",
        { password: newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoading(false);
      if (!response.data.success) {
        setError("Password change failed. Please try again.");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Error changing password. Please try again later.");
      console.error("Error changing password:", error);
    }
  };
  

  return (
    <div className="user-info-container uk-container">
      <h2 className="uk-heading-small uk-text-center">User Information</h2>
      {error && <div className="uk-alert-danger uk-margin">{error}</div>}
      <form onSubmit={handleUpdateUsername} className="user-info-form">
        <div className="uk-margin uk-grid-small uk-child-width-1-2@s" data-uk-grid>
          <div>
            <label className="uk-form-label">Email Address</label>
          </div>
          <div>
            <input
              type="email"
              className="uk-input"
              placeholder="Email"
              readOnly
            />
          </div>
        </div>
        <div className="uk-margin uk-grid-small uk-child-width-1-2@s" data-uk-grid>
          <div>
            <label className="uk-form-label">Username</label>
          </div>
          <div>
            <input
              type="text"
              className="uk-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="uk-margin uk-flex uk-position-center ">
          <button
            type="submit"
            className="uk-button uk-button-primary"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
      <form onSubmit={handleChangePassword}>
        <div className="uk-margin uk-grid-small" data-uk-grid>
          <div>
            <label className="uk-form-label">New Password</label>
          </div>
          <div>
            <input
              type="password"
              className="uk-input"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="uk-button uk-button-secondary uk-width-1-1 uk-margin-top"
          disabled={isLoading}
        >
          {isLoading ? "Changing Password..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default UserInfo;
