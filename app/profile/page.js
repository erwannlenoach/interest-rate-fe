"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import withAuth from "../hoc/withAuth";
import History from "../history/page";
import ProfitSplitHistory from "../profit-split-history/page";

import UserInfo from "../components/user-info/page";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const username = decodedToken.username;

        const response = await axios.post(
          "http://localhost:8800/api/profile",
          { username },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProfile(response.data.user);
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
    <div className="uk-container uk-container-small uk-margin-large-top uk-padding">
      <UserInfo user={profile} />
      <History user={profile} />
      <ProfitSplitHistory user={profile} /> 
    </div>
  );
};

export default withAuth(UserProfile);