
"use client";
import React from "react";
import "uikit/dist/css/uikit.min.css";
import './styles.css';
import { informationText } from "@/app/utils/constants";

export default function Information() {
  return (
    <div className="uk-container uk-margin-large-top uk-margin-large-bottom">
      <h2 className="info-title">About Nostra</h2>
      <div className="info-text" dangerouslySetInnerHTML={{ __html: informationText }}></div>
    </div>
  );
}

