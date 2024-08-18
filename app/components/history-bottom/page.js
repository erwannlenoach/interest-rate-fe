"use client";

import React from "react";
import Link from "next/link";
import "./styles.css"; 

const CustomButton = ({ href, icon, label, onClick, variant }) => {
  return href ? (
    <Link href={href}>
      <button
        className={`uk-button uk-border-rounded custom-button ${variant}`}
        onClick={onClick}
      >
        <span uk-icon={`icon: ${icon}; ratio: 1.5`}></span>{" "}
        <span>{label}</span>
      </button>
    </Link>
  ) : (
    <button
      className={`uk-button uk-border-rounded custom-button ${variant}`}
      onClick={onClick}
    >
      <span uk-icon={`icon: ${icon}; ratio: 1.5`}></span>{" "}
      <span>{label}</span>
    </button>
  );
};

export default CustomButton;
