"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import withAuth from "../hoc/withAuth";


const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const username =  decodedToken.username 

        const response = await axios.post(
          "http://localhost:8800/api/users/profile",
          { username }, // Send username in the request body
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
    <div>
      <h1>Welcome, {profile.username}</h1>
      {/* Display other profile information here */}
    </div>
  );
};

export default withAuth(UserProfile);
