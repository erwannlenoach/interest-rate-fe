"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const router = useRouter();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const username = decodedToken.username;

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/profile`,
        { username },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(response.data.user);
    } catch (error) {
      console.error("Failed to fetch user", error);
    } finally {
      setLoading(false);
    }
  };

  const login = (token) => {
    sessionStorage.setItem("token", token);
    setToken(token);
    fetchUser(token); 
    router.push("/profile");
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
    setUser(null); 
    router.push("/login");
  };

  const isAuthenticated = () => {
    return token !== null;
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, isAuthenticated, loading }}
    >
      {!loading && children} {/* Render children only when not loading */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
