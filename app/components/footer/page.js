import "uikit/dist/css/uikit.min.css";
import "uikit/dist/js/uikit.min.js";
import "uikit/dist/js/uikit-icons.min.js";

export default function footer() {
  return (
    <footer className="uk-section uk-section-secondary uk-light">
      <div className="uk-container">
        <div className="uk-flex">
          <div>
            <h4>About Us</h4>
            <p>
              Simulation of arm's length loans
            </p>
          </div>
          <div>
            <h4>Contact</h4>
            <ul className="uk-list">
              <li>Email: info@example.com</li>
              <li>Phone: +123 456 7890</li>
              <li>Address: 123 Main Street, Anytown, USA</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
