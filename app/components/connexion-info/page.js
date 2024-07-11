"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./styles.css";

const ConnexionInfo = ({ user }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);

    }
  }, [user]);

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

  return (
    <div className="card">
      <h3 className='uk-text-center'>Connexion</h3>
      <form
        onSubmit={handleUpdateUsername}
        className="user-info-form uk-form-stacked uk-padding"
      >
        <div
          className="uk-margin uk-grid-small uk-child-width-1-2@s"
          data-uk-grid
        >
          <div>
            <label className="uk-form-label">Email Address</label>
          </div>
          <div>
            <input
              type="email"
              className="uk-input"
              placeholder="Email"
              value={email}
              readOnly
              disabled
            />
          </div>
        </div>
        <div
          className="uk-margin uk-grid-small uk-child-width-1-2@s"
          data-uk-grid
        >
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
        <div className="uk-flex uk-flex-center uk-margin-large-top">
          <button
            type="submit"
            className="uk-button uk-button-primary"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
      {error && <div className="uk-alert-danger uk-margin">{error}</div>}
    </div>
  );
};

export default ConnexionInfo;
