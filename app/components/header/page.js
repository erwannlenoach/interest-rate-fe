import Link from "next/link"

export default function header() {
  return (
    <div uk-sticky="true">
      <header>
        <nav className="uk-margin-medium-left">
          <div className="uk-navbar-right">
            <ul className="uk-navbar-nav">
              <li>
              <Link href="/"
                className="uk-text-large">&#x1F3E0;</Link>
              </li>
              <li>
              <Link href="/history"
                className="uk-text-large">Loan History</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
}
