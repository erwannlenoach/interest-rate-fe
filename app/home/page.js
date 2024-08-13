"use client";
import React, { useState } from "react";
import Link from "next/link";
import "uikit/dist/css/uikit.min.css";
import Image from "next/image";
import { useAuth } from "../context/AuthContext"; // Make sure to import useAuth hook
import "./styles.css";

export default function HomeScreen() {
  const { token } = useAuth(); // Access the authentication token
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
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
          {token ? (
            <>
              {/* User is logged in, show Interest Rates and Profit Split buttons */}
              <Link href="/interest-rates">
                <button className="uk-button uk-button-primary uk-margin-top uk-border-rounded">
                  Interest Rates Simulator
                </button>
              </Link>
              <Link href="/profit-split">
                <button className="uk-button uk-button-secondary uk-margin-top uk-margin-left uk-border-rounded">
                  Profit Split Simulator
                </button>
              </Link>
            </>
          ) : (
            <>
              {/* User is not logged in, show Log in and Sign up buttons */}
              <Link href="/login">
                <button className="uk-button uk-button-primary uk-margin-top uk-border-rounded">
                  Log in
                </button>
              </Link>
              <Link href="/signup">
                <button className="uk-button uk-button-secondary uk-margin-top uk-margin-left uk-border-rounded">
                  Sign up
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
