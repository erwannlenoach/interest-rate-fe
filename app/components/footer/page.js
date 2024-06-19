import "uikit/dist/css/uikit.min.css";
import "uikit/dist/js/uikit.min.js";
import "uikit/dist/js/uikit-icons.min.js";

export default function Footer() {
  return (
    <footer className="uk-section-secondary uk-light">
      <div className="uk-container uk-margin-medium-top uk-padding">
        <div
          className="uk-grid uk-child-width-1-2@s uk-grid-match uk-margin-medium-top"
          data-uk-grid
        >
          <div>
            <h4>About this project</h4>
            <p>
              Determining the arm's length price can become a daunting challenge
              for tax specialists. This AI-powered solutions aims to ease this
              process and become a blueprint for the future of transfer pricing.{" "}
            </p>
          </div>
          <div>
            <h4>Contact the author</h4>
            <ul className="uk-list">
              <li>
                <a href="mailto:erwann.lenoach@outlook.fr">
                  <span uk-icon="icon: mail"></span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/erwann-le-noac-h/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span uk-icon="icon: linkedin"></span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/erwannlenoach?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span uk-icon="icon: github"></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
