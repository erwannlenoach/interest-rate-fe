"use client";
import React from "react";
import Link from "next/link";
import "uikit/dist/css/uikit.min.css";

export default function HomeScreen() {
  return (
    <div
      className="uk-height-viewport uk-grid-collapse uk-child-width-1-2@m"
      uk-grid="true"
    >
      <div
        className="uk-background-cover"
        style={{ backgroundImage: "url('/splashscreen.jpg')" }}
      ></div>
      <div className="uk-flex uk-flex-center uk-flex-middle uk-background-secondary uk-light">
        <div className="uk-text-center">
          <h2>AI-boosted transfer pricing benchmarking</h2>
          <Link href="/interest_rates">
            <button className="uk-button uk-button-primary uk-margin-top">
              Get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
