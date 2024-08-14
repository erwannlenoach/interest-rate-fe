"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import withAuth from "../hoc/withAuth";
import EditPassword from "../components/edit-password/page";
import ConnexionInfo from "../components/connexion-info/page";
import PageTitle from "../components/page-title/page";

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
    <div className="user-info-container uk-container uk-margin-large">
      <PageTitle title="ACCOUNT SETTINGS" />
      <div className="uk-flex uk-flex-column">
        <ConnexionInfo user={user} />
        <EditPassword user={user} token={token} />
      </div>
    </div>
  );
};

export default withAuth(UserProfile);
