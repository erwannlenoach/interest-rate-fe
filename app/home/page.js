"use client";
import React, { useState } from "react";
import Link from "next/link";
import "uikit/dist/css/uikit.min.css";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import Dashboard from "@/app/dashboard/page";
import "./styles.css";

export default function HomeScreen() {
  const { user } = useAuth();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div>
      {user ? (
        <Dashboard />
      ) : (
        <>
          <div className="uk-height-viewport uk-position-relative">
            <div className="background-image">
              <Image
                src="/planet.jpg"
                alt="Background"
                layout="fill"
                objectFit="cover"
                quality={100}
                onLoadingComplete={() => setIsImageLoaded(true)}
              />
            </div>
            {isImageLoaded && (
              <div className="uk-position-center uk-text-center">
                <h1 className="title">
                  Discover the AI-based simulator for transfer pricing analysis
                </h1>
                <Link href="/login">
                  <button className="uk-button uk-button-primary uk-margin-top uk-border-rounded">
                    Log in
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="uk-button uk-button-secondary uk-margin-top uk-margin-left uk-border-rounded button-signup-home">
                    Sign up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
