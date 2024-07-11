"use client";

import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

const EditPassword = ({ user, token }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.patch(
        "http://localhost:8800/api/password/edit",
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
    <div className="card">
      <h3 className="uk-card-title uk-text-center">Mot de passe</h3>
      {error && <div className="uk-alert-danger uk-margin">{error}</div>}
      {success && <div className="uk-alert-success uk-margin">{success}</div>}
      <form
        onSubmit={handleChangePassword}
        className="uk-form-stacked uk-padding"
      >
        <div
          className="uk-margin uk-grid-small uk-child-width-1-2@s"
          data-uk-grid
        >
          <div>
            <label className="uk-form-label">Current Password</label>
          </div>
          <div>
            <input
              type="password"
              className="uk-input"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div
          className="uk-margin uk-grid-small uk-child-width-1-2@s"
          data-uk-grid
        >
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
        <div
          className="uk-margin uk-grid-small uk-child-width-1-2@s"
          data-uk-grid
        >
          <div>
            <label className="uk-form-label">Confirm New Password</label>
          </div>
          <div>
            <input
              type="password"
              className="uk-input"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="uk-flex uk-flex-center uk-margin-large-top">
          <button
            type="submit"
            className="uk-button uk-button-primary"
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
