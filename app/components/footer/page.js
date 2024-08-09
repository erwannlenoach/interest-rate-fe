import React from "react";
import "uikit/dist/css/uikit.min.css";
import "uikit/dist/js/uikit.min.js";
import "uikit/dist/js/uikit-icons.min.js";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="uk-section-secondary uk-light uk-padding">
      <div className="uk-container uk-flex uk-flex-between uk-flex-middle">
        {/* Left side: Documentation and Privacy Links */}
        <div className="uk-flex">
          <Link href="/documentation" className="uk-margin-right uk-text-bold">
            DOCUMENTATION
          </Link>
          <Link href="/privacy" className="uk-text-bold">
            PRIVACY
          </Link>
        </div>

        {/* Right side: Social Media Icons */}
        <div className="uk-flex">
          <a
            href="mailto:erwann.lenoach@outlook.fr"
            className="uk-margin-small-right uk-icon-link"
            uk-icon="icon: mail"
            title="Email"
          ></a>
          <a
            href="https://www.linkedin.com/in/erwann-le-noac-h/"
            target="_blank"
            rel="noopener noreferrer"
            className="uk-margin-small-right uk-icon-link"
            uk-icon="icon: linkedin"
            title="LinkedIn"
          ></a>
          <a
            href="https://github.com/erwannlenoach?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="uk-icon-link"
            uk-icon="icon: github"
            title="GitHub"
          ></a>
        </div>
      </div>
    </footer>
  );
}
