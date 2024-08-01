"use client";

import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { token, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !token) {
        router.push("/login");
      }
    }, [token, loading, router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return token ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
