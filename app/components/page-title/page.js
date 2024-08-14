"use client";

import React from "react";
import "./styles.css"; 

const PageTitle = ({ title, subtitle }) => {
  return (
    <div className="uk-text-center uk-margin-large-bottom uk-margin-large-top">
      <h1 className="uk-heading-line uk-text-center">
        <span>{title}</span>
      </h1>
      {subtitle && <p className="uk-text-lead">{subtitle}</p>}
    </div>
  );
};

export default PageTitle;
