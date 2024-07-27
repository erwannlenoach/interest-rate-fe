"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import './styles.css';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8800/api/forgot-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error sending email. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form-container">
        <h1 className="uk-heading-medium uk-text-center">Reset your password</h1>
        {message && <div className="uk-alert uk-alert-primary" uk-alert="true">{message}</div>}
        <form onSubmit={handleResetPassword}>
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
          <button type="submit" className="uk-button uk-button-primary uk-width-1-1" disabled={isLoading}>
            {isLoading ? (
              <div uk-spinner="ratio: 0.6"></div>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
