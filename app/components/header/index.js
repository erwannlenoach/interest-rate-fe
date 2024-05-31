import "uikit/dist/css/uikit.min.css";
import "uikit/dist/js/uikit.min.js";
import "uikit/dist/js/uikit-icons.min.js";

export default function header() {
  return (
    <div uk-sticky>
      <header>
        <nav class="uk-navbar-container" uk-navbar>
          <div class="uk-navbar-right">
            <ul class="uk-navbar-nav">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Loan history</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
}
