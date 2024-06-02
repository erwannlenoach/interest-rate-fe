import "uikit/dist/css/uikit.min.css";
import "uikit/dist/js/uikit.min.js";
import "uikit/dist/js/uikit-icons.min.js";

export default function footer() {
  return (
    <footer className="uk-section uk-section-secondary uk-light">
      <div className="uk-container">
        <div className="uk-grid-match uk-child-width-1-2@m">
          <div>
            <h4>About Us</h4>
            <p>
              We are a company dedicated to providing the best services to our
              customers. Our mission is to deliver high-quality solutions
              tailored to your needs.
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
