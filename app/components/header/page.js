"use client";

import Link from 'next/link';
import { useEffect } from 'react';

export default function Header() {
  useEffect(() => {
    // This ensures that the UIkit scripts are run after the component is mounted
    if (typeof window !== 'undefined') {
      const UIkit = require('uikit');
      const Icons = require('uikit/dist/js/uikit-icons');
      UIkit.use(Icons);
    }
  }, []);

  return (
    <header uk-sticky="true">
      <nav className="uk-background-primary">
        <div className="uk-navbar-right uk-margin-medium-left">
          <ul className="uk-navbar-nav">
            <li>
              <Link href="/" passHref
                className="uk-text-large">&#x1F3E0;
              </Link>
            </li>
            <li>
              <Link href="/history" passHref
                className="uk-text-large">Loan History
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
