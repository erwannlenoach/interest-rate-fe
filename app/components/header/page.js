"use client";

import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import "uikit/dist/css/uikit.min.css";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import "./styles.css";
import {jwtDecode} from "jwt-decode";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUsername] = useState(null);

  useEffect(() => {
    UIkit.use(Icons);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { token, logout } = useAuth();

  useEffect(() => {
    if (token) {
      const user = jwtDecode(token);
      setUsername(user.username);
    }
  }, [token]);

  return (
    <header>
      <nav className="uk-background-secondary uk-navbar custom-navbar">
        <div className="uk-navbar-left uk-margin-large-left">
          <ul className="uk-navbar-nav">
            <li>
              <Link href="/">
                <img
                  src="/logo.svg"
                  alt="Profile Icon"
                  className="uk-navbar-item uk-padding-small"
                />
              </Link>
            </li>
            <li>
              <Link href="/information" passHref>
                THE CONCEPT
              </Link>
            </li>
          </ul>
        </div>
        <div className="uk-navbar-right uk-margin-large-right">
          {token ? (
            <>
              <span className="uk-margin-right">Welcome, {userName}</span>
              <Link href="/profile">
                <button className="uk-button uk-button-primary uk-margin-right">
                  My Profile
                </button>
              </Link>
              <div className="uk-inline">
                <button
                  className="uk-button uk-button-primary uk-margin-right"
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={isOpen} // Add aria-expanded to manage state visibility
                >
                  TP Simulator
                </button>
                <div
                  uk-dropdown="mode: click; pos: bottom-center"
                  className="uk-dropdown"
                >
                  <ul className="uk-nav uk-dropdown-nav">
                    <li>
                      <Link href="/interest_rates">
                        Interest Rates
                      </Link>
                    </li>
                    <li>
                      <Link href="/profit-split">
                        Profit Split
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
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
                aria-haspopup="true"
                aria-expanded={isOpen} // Add aria-expanded to manage state visibility
              >
                <span data-uk-icon="icon: user" className="uk-icon"></span>
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
