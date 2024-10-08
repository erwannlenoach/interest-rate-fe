"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "uikit/dist/css/uikit.min.css";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";

UIkit.use(Icons);

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    const urlParts = window.location.pathname.split("/");
    const tokenFromUrl = urlParts[urlParts.length - 1];
    setToken(tokenFromUrl);
  }, []);

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!validatePassword(newPassword)) {
      setMessage(
        "Password must be at least 8 characters long, include uppercase and lowercase letters, and a number."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/password/reset/${token}`,
        { newPassword }
      );
      setMessage(
        response.data.message || "Password has been reset successfully"
      );
      router.push("/login");
    } catch (error) {
      setMessage("Error resetting password. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reset-password-container uk-container uk-margin-large-top">
      <div className="reset-password-form-container uk-card uk-card-default uk-card-body uk-width-1-2@m uk-align-center uk-margin-top-large">
        <h1 className="uk-heading-medium uk-text-center">
          Reset your password
        </h1>
        {message && (
          <div className="uk-alert uk-alert-primary" uk-alert="true">
            {message}
          </div>
        )}
        <form onSubmit={handleResetPassword}>
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
          <div className="uk-margin uk-text-center">
            <button
              type="submit"
              className="uk-button uk-button-primary uk-border-rounded"
              disabled={isLoading}
            >
              {isLoading ? (
                <div uk-spinner="ratio: 0.6"></div>
              ) : (
                "Reset Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
