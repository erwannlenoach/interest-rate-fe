"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "uikit/dist/css/uikit.min.css";
import "./styles.css";

const ConnexionInfo = ({ user }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    if (user) {
      setUsername(user?.username);
      setEmail(user?.email);
    }
  }, [user]);

  const handleUpdateUsername = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/username/edit`,
        { email, username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoading(false);
      if (response.status === 200) {
        setSuccess("Username changed successfully.");
        setError("");
        setUsername(response.data.username);
        setTimeout(() => setSuccess(""), 5000);
      } else {
        setError("Username change failed. Please try again.");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Error updating username. Please try again later.");
      console.error("Error updating username:", error);
    }
  };

  return (
    <div className="uk-card uk-card-default uk-card-body uk-margin-bottom">
      <h3 className="uk-card-title uk-margin-medium-bottom">Connexion</h3>
      {error && <div className="uk-alert-danger uk-margin">{error}</div>}
      {success && <div className="uk-alert-success uk-margin">{success}</div>}
      <form
        onSubmit={handleUpdateUsername}
        className="uk-form-stacked"
      >
        <div className="uk-margin">
          <label className="uk-form-label" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="uk-input"
            placeholder="Email"
            value={email}
            readOnly
            disabled
          />
        </div>
        <div className="uk-margin">
          <label className="uk-form-label" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="uk-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="uk-flex uk-margin-large-top">
          <button
            type="submit"
            className="uk-button uk-button-primary uk-border-rounded"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConnexionInfo;
