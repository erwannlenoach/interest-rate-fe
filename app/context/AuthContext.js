"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ token, setToken] = useState(null);
  const router = useRouter();


  useEffect(() => 
  {
    const storedToken = sessionStorage.getItem("token")
    if(storedToken) {
      setToken(storedToken);
      const decodedUser = jwtDecode(storedToken);
      setUser(decodedUser);
    }
  }, [])


  const logout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
