"use client";

import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

export default function Header() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const UIkit = require("uikit");
      const Icons = require("uikit/dist/js/uikit-icons");
      UIkit.use(Icons);
    }
  }, []);

  const { user, logout } = useAuth();

  return (
    <header>
      <nav className="uk-background-secondary uk-navbar">
        <div className="uk-navbar-left uk-margin-medium-left">
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
        <div className="uk-navbar-right uk-margin-medium-right">
          {user ? (
            <>
              <span className="uk-margin-right">Welcome, {user.username}</span>
              <button onClick={logout} className="uk-button uk-button-danger">Logout</button>
            </>
          ) : (
            <Link href="/login" passHref className="uk-button uk-button-primary">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
