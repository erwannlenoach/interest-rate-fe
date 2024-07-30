import React from "react";
import "uikit/dist/css/uikit.min.css";
import "uikit/dist/js/uikit.min.js";
import "uikit/dist/js/uikit-icons.min.js";

export default function Footer() {
  return (
    <footer className="uk-section-secondary uk-light">
      <div className="uk-container uk-padding">
        <div className="uk-grid-divider uk-grid-small" data-uk-grid>
          <div className="uk-width-1-2@s uk-flex uk-flex-column">
            <h4 className="uk-text-bold">About this project</h4>
            <p>
              Determining the arm's length price can become a daunting challenge
              for tax specialists. This AI-powered solution aims to ease this
              process and become a blueprint for the future of transfer pricing.
            </p>
          </div>
          <div className="uk-width-1-2@s uk-flex uk-flex-column">
            <h4 className="uk-text-bold">Contact</h4>
            <div>
              <a
                href="mailto:erwann.lenoach@outlook.fr"
                className="uk-margin-small-right uk-icon-large"
              >
                <span uk-icon="icon: mail"></span>
              </a>
              <a
                href="https://www.linkedin.com/in/erwann-le-noac-h/"
                target="_blank"
                rel="noopener noreferrer"
                className="uk-margin-small-right uk-icon-large"
              >
                <span uk-icon="icon: linkedin"></span>
              </a>
              <a
                href="https://github.com/erwannlenoach?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="uk-margin-small-right uk-icon-large"
              >
                <span uk-icon="icon: github"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
