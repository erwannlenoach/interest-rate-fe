"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Header() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const UIkit = require("uikit");
      const Icons = require("uikit/dist/js/uikit-icons");
      UIkit.use(Icons);
    }
  }, []);

  return (
    <header>
      <nav className="uk-background-secondary">
        <div className="uk-navbar-right uk-margin-medium-left">
          <ul className="uk-navbar-nav">
            <li>
              <Link href="/" passHref className="uk-text-large">
                <span uk-icon="icon: home"></span>
              </Link>
            </li>
            <li>
              <Link href="/interest_rates" passHref className="uk-text-large">
                Interest Rate Simulation
              </Link>
            </li>
            <li>
              <Link href="/history" passHref className="uk-text-large">
                Loan History
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
