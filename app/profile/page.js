"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import withAuth from "../hoc/withAuth";
import EditPassword from "../components/edit-password/page"
import ConnexionInfo from "../components/connexion-info/page";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const { user, logout } = useAuth();
  const token = sessionStorage.getItem("token");


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (typeof window !== "undefined") {
          const decodedToken = jwtDecode(token);
          const username = decodedToken.username;

          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/profile`,
            { username },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setProfile(response.data.user);
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };

    fetchProfile();
  }, [user, logout]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="uk-container uk-container-small uk-margin-large-top uk-margin-large-bottom uk-padding">
      <div className="user-info-container uk-container">
      <h2 className="uk-heading-small uk-margin-large-bottom uk-text-center">
        Account Settings
      </h2>
      <div
        className="uk-flex uk-flex-column"
      >
        <ConnexionInfo user={user} />
        <EditPassword user={user} token={token} />
      </div>
    </div>

    </div>
  );
};

export default withAuth(UserProfile);
