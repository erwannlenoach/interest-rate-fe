"use client";

import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import "uikit/dist/css/uikit.min.css";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import "./styles.css";

UIkit.use(Icons);

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { user, logout } = useAuth();

  return (
    <header>
      <nav className="uk-background-secondary uk-navbar custom-navbar">
        <div className="uk-navbar-left uk-margin-large-left">
          <ul className="uk-navbar-nav">
            <li>
              <Link href="/">
                <img src="./logo.svg" alt="Profile Icon" className="uk-navbar-item uk-padding-small" />
              </Link>
            </li>
            <li>
              <Link href="/interest_rates" passHref>
                Interest Rate Simulation
              </Link>
            </li>
            <li>
              <Link href="/history" passHref>
                Loan History
              </Link>
            </li>
          </ul>
        </div>
        <div className="uk-navbar-right uk-margin-large-right">
          {user ? (
            <>
              <span className="uk-margin-right">Welcome, {user.username}</span>
              <button onClick={logout} className="uk-button uk-button-danger">
                Logout
              </button>
            </>
          ) : (
            <div className="uk-inline">
              <button
                className="uk-button-icon"
                type="button"
                onClick={toggleMenu}
              >
                <span uk-icon="icon: user" className="uk-icon"></span>
              </button>
              <div
                uk-dropdown="mode: click; pos: bottom-center"
                hidden={!isOpen}
                className="custom-dropdown"
              >
                <ul className="uk-nav uk-dropdown-nav header-dropdown">
                  <li>
                    <Link href="/signup" passHref>
                      Sign Up
                    </Link>
                  </li>
                  <li>
                    <Link href="/login" passHref>
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
