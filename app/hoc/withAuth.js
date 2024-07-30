"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { loading } = useAuth();
    const router = useRouter();
    const [token, setToken] = useState(null);

    useEffect(() => {
      if (typeof window !== "undefined") {
        const storedToken = sessionStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
        } else {
          router.push("/login");
        }
      }
    }, [token, router]);

    if (loading) {
      return <div>Loading...</div>; // Render a loading state while checking for the token
    }

    return token ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
