"use client";

import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { loading } = useAuth();
    const router = useRouter();
    const storedToken = sessionStorage.getItem("token");

    useEffect(() => {
      if (!storedToken) {
        router.push("/login");
      }
    }, [storedToken, router]);

    if (loading) {
      return <div>Loading...</div>; // Render a loading state while checking for the token
    }

    return storedToken ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
