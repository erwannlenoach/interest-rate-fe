// context/AuthContext.js
"use client"; // Mark this file as a client component

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Use next/navigation instead of next/router

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user')); // Replace with your auth logic
    if (user) {
      setUser(user);
    }
  }, []);

  const login = async (username, password, redirectPath) => {
    try {
      const response = await fetch('http://localhost:8800/api/users/connexion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
        router.push(redirectPath); // Redirect to the intended page upon successful login
      } else {
        console.error(data.message); // Handle error response
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/auth');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
