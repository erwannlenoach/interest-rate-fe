// hoc/withAuth.js
"use client"; // Mark this file as a client component

import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (!user) {
        router.push(`/auth?redirect=${pathname}`);
      }
    }, [user, router, pathname]);

    if (!user) {
      return null; // or a loading spinner, etc.
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
