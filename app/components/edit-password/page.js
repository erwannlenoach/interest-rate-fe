"use client";

import React, { useState } from "react";
import axios from "axios";
import "uikit/dist/css/uikit.min.css";
import "./styles.css";

const EditPassword = ({ user, token }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!validatePassword(newPassword)) {
      setError(
        "Password must be at least 8 characters long, include uppercase and lowercase letters, and a number."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/password/edit`,
        { email: user.email, currentPassword, newPassword, confirmPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoading(false);
      if (response.status === 200) {
        setSuccess("Password changed successfully.");
        setError("");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => setSuccess(""), 5000);
      } else {
        setError("Password change failed. Please try again.");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Error changing password. Please try again later.");
      console.error("Error changing password:", error);
    }
  };

  return (
    <div className="uk-card uk-card-default uk-card-body">
      <h3 className="uk-card-title uk-margin-medium-bottom">Mot de passe</h3>
      {error && <div className="uk-alert-danger uk-margin">{error}</div>}
      {success && <div className="uk-alert-success uk-margin">{success}</div>}
      <form onSubmit={handleChangePassword} className="uk-form-stacked">
        <div className="uk-margin">
          <label className="uk-form-label">Current Password</label>
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
          <label className="uk-form-label">New Password</label>
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
          <label className="uk-form-label">Confirm New Password</label>
          <input
            type="password"
            className="uk-input"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="uk-flex uk-margin-large-top">
          <button
            type="submit"
            className="uk-button uk-button-primary uk-border-rounded"
            disabled={isLoading}
          >
            {isLoading ? "Changing Password..." : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPassword;
