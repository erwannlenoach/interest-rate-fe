"use client";

import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const EditPassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    const token = sessionStorage.getItem('token')
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8800/api/users/password/edit",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        setSuccess("Password changed successfully.");
        setError(null);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Error changing password.");
    }
  };

  return (
    <div className="uk-card uk-card-default uk-card-body uk-margin">
      <h3 className="uk-card-title">Change Password</h3>
      <form onSubmit={handlePasswordChange}>
        <div className="uk-margin">
          <input
            type="password"
            className="uk-input"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="uk-margin">
          <input
            type="password"
            className="uk-input"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="uk-margin">
          <input
            type="password"
            className="uk-input"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="uk-text-danger">{error}</p>}
        {success && <p className="uk-text-success">{success}</p>}
        <button type="submit" className="uk-button uk-button-primary uk-width-1-1">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default EditPassword;
