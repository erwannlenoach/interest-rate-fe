import "uikit/dist/css/uikit.min.css";
import "uikit/dist/js/uikit.min.js";
import "uikit/dist/js/uikit-icons.min.js";

export default function Footer() {
  return (
    <footer className="uk-section-secondary uk-light">
      <div className="uk-container uk-margin-medium-top uk-padding">
        <div className="uk-grid uk-child-width-1-2@s uk-grid-match uk-margin-medium-top" data-uk-grid>
          <div>
            <h4>About Us</h4>
            <p>Simulation of arm's length loans</p>
          </div>
          <div>
            <h4>Contact</h4>
            <ul className="uk-list">
              <li>Email: <a href="mailto:info@example.com">info@example.com</a></li>
              <li>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                  <span uk-icon="icon: linkedin"></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
