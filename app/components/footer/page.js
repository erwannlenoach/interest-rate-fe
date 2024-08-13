import React from "react";
import "uikit/dist/css/uikit.min.css";
import "uikit/dist/js/uikit.min.js";
import "uikit/dist/js/uikit-icons.min.js";
import Link from "next/link";
import "./styles.css";

export default function Footer() {
  return (
    <footer className="uk-section-secondary uk-light uk-padding">
      <div className="uk-container uk-flex uk-flex-between uk-flex-middle container-footer">
        <div className="uk-flex">
          <Link href="/documentation" className="uk-margin-right footer-link">
            DOCUMENTATION
          </Link>
          <Link href="/privacy" className="footer-link">
            PRIVACY
          </Link>
        </div>
        <div className="uk-flex icon-container">
          <a
            href="mailto:erwann.lenoach@outlook.fr"
            className="uk-margin-small-right uk-icon-lin uk-icon-mail"
            uk-icon="icon: mail;  ratio: 1.5"
            title="Email"
          ></a>
          <a
            href="https://www.linkedin.com/in/erwann-le-noac-h/"
            target="_blank"
            rel="noopener noreferrer"
            className="uk-margin-small-right uk-icon-link"
            uk-icon="icon: linkedin;  ratio: 1.5"
            title="LinkedIn"
          ></a>
          <a
            href="https://github.com/erwannlenoach?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="uk-icon-link"
            uk-icon="icon: github; ratio: 1.5"
            title="GitHub"
          ></a>
        </div>
      </div>
    </footer>
  );
}
