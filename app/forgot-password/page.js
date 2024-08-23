"use client";

import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false); 
  const [cooldown, setCooldown] = useState(false); 

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (cooldown) {
      setMessage("Please wait before requesting another reset email.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/password/forgot`,
        { email }
      );
      setMessage(response.data.message);
      setEmailSent(true);
      setCooldown(true); 

      setTimeout(() => {
        setCooldown(false);
      }, 60000);
    } catch (error) {
      setMessage("Error sending email. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form-container">
        <h2 className="uk-heading-medium uk-text-center">
          Reset your password
        </h2>
        {message && (
          <div className="uk-alert uk-alert-primary" uk-alert="true">
            {message}
          </div>
        )}
        <form onSubmit={handleForgotPassword}>
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
          <div className="uk-margin uk-text-center">
            <button
              type="submit"
              className="uk-button uk-button-primary uk-border-rounded"
              disabled={isLoading || cooldown}
            >
              {isLoading ? (
                <div uk-spinner="ratio: 0.6"></div>
              ) : emailSent ? (
                "Re-send Reset Link"
              ) : (
                "Send Reset Link"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
