"use client";

import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import "uikit/dist/css/uikit.min.css";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import { jwtDecode } from "jwt-decode";
import "./styles.css";

export default function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isTPSimulatorMenuOpen, setIsTPSimulatorMenuOpen] = useState(false);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    UIkit.use(Icons);
  }, []);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleTPSimulatorMenu = () => {
    setIsTPSimulatorMenuOpen(!isTPSimulatorMenuOpen);
  };

  const { token, logout } = useAuth();

  useEffect(() => {
    if (token) {
      const user = jwtDecode(token);
      setUserName(user.username);
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
              <div className="uk-inline">
                <button
                  className="uk-button uk-button-default button-header"
                  type="button"
                  onClick={toggleTPSimulatorMenu}
                  aria-haspopup="true"
                  aria-expanded={isTPSimulatorMenuOpen}
                >
                  <span data-uk-icon="icon: cog"></span> TP Simulator
                </button>
                <div
                  uk-dropdown="mode: click; pos: bottom-center"
                  hidden={!isTPSimulatorMenuOpen}
                  className="uk-dropdown"
                >
                  <ul className="uk-nav uk-dropdown-nav">
                    <li className="uk-parent">
                      <a href="#">
                        <span
                          data-uk-icon="icon: more"
                          className="uk-icon"
                        ></span>
                        Profit Split
                      </a>
                      <ul className="uk-nav-sub">
                        <li>
                          <Link href="/profit-split">Simulator</Link>
                        </li>
                        <li>
                          <Link href="/profit-split-history">History</Link>
                        </li>
                      </ul>
                    </li>
                    <li className="uk-parent">
                      <a href="#">
                        <span
                          data-uk-icon="icon: arrow-up-right"
                          className="uk-icon"
                        ></span>
                        Interest Rates
                      </a>
                      <ul className="uk-nav-sub">
                        <li>
                          <Link href="/interest-rates">Simulator</Link>
                        </li>
                        <li>
                          <Link href="/interest-rates-history">History</Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="uk-inline">
                <button
                  className="uk-button uk-button-default button-header"
                  type="button"
                  onClick={toggleUserMenu}
                  aria-haspopup="true"
                  aria-expanded={isUserMenuOpen}
                >
                  <span data-uk-icon="icon: user" className="uk-icon"></span>
                </button>
                <div
                  uk-dropdown="mode: click; pos: bottom-right"
                  hidden={!isUserMenuOpen}
                  className="custom-dropdown"
                >
                  <div className="uk-card uk-card-body uk-card-default uk-margin-bottom uk-text-center">
                    <span data-uk-icon="icon: mail" className="uk-icon"></span>
                    <p className="uk-card-title uk-text-center">{userName}</p>
                  </div>
                  <ul className="uk-nav uk-dropdown-nav">
                    <li>
                      <Link href="/profile" passHref>
                        <span
                          data-uk-icon="icon: settings"
                          className="uk-icon"
                        ></span>
                        Account Settings
                      </Link>
                    </li>
                    <li>
                      <a onClick={logout}>
                        <span
                          data-uk-icon="icon: sign-out"
                          className="uk-icon"
                        ></span>
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <div className="uk-inline">
              <button
                className="uk-button-icon"
                type="button"
                onClick={toggleUserMenu}
                aria-haspopup="true"
                aria-expanded={isUserMenuOpen}
              >
                <span data-uk-icon="icon: user" className="uk-icon"></span>
              </button>
              <div
                uk-dropdown="mode: click; pos: bottom-center"
                hidden={!isUserMenuOpen}
                className="custom-dropdown"
              >
                <ul className="uk-nav uk-dropdown-nav header-dropdown">
                  <li>
                    <Link href="/signup" passHref>
                      <span
                        data-uk-icon="icon: file-edit"
                        className="uk-icon"
                      ></span>
                      Sign Up
                    </Link>
                  </li>
                  <li>
                    <Link href="/login" passHref>
                      <span
                        data-uk-icon="icon: sign-in"
                        className="uk-icon"
                      ></span>
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
