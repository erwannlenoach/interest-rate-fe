"use client";
import React from "react";
import Link from "next/link";
import "uikit/dist/css/uikit.min.css";
import Image from "next/image";
import './styles.css'; // Import the CSS file

export default function HomeScreen() {
  return (
    <div className="uk-height-viewport uk-position-relative">
      <div className="background-image">
        <Image
          src="/planet.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="uk-position-center uk-text-center">
        <h1 className="title">A new approach to transfer pricing</h1>
        <p className="subtitle">Nostra is an experimental app to determine transfer pricing analysis for financial data through machine learning.</p>
        <Link href="/interest_rates">
          <button className="uk-button uk-button-primary uk-margin-top">
            INTEREST RATE SIMULATION
          </button>
        </Link>
      </div>
    </div>
  );
}
