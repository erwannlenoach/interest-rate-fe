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
  const [isInterestRatesMenuOpen, setIsInterestRatesMenuOpen] = useState(false);
  const [isProfitSplitMenuOpen, setIsProfitSplitMenuOpen] = useState(false);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    UIkit.use(Icons);
    UIkit.update();
  }, []);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleInterestRatesMenu = () => {
    setIsInterestRatesMenuOpen(!isInterestRatesMenuOpen);
  };

  const toggleProfitSplitMenu = () => {
    setIsProfitSplitMenuOpen(!isProfitSplitMenuOpen);
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
          </ul>
        </div>
        <div className="uk-navbar-right uk-margin-large-right">
          {token ? (
            <>
              {/* Interest Rates Dropdown */}
              <div className="uk-inline">
                <button
                  className="uk-button uk-button-default button-header uk-button-icon"
                  type="button"
                  onClick={toggleInterestRatesMenu}
                  aria-haspopup="true"
                  aria-expanded={isInterestRatesMenuOpen}
                >
                  <span data-uk-icon="icon: arrow-up-right"></span> Interest
                  Rates
                </button>
                <div
                  uk-dropdown="mode: click; pos: bottom-center"
                  hidden={!isInterestRatesMenuOpen}
                  className="uk-dropdown"
                >
                  <ul className="uk-nav uk-dropdown-nav">
                    <li>
                      <Link href="/interest-rates">
                        <span
                          data-uk-icon="icon: laptop"
                          className="uk-icon"
                        ></span>{" "}
                        <span>Simulator</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/interest-rates-history">
                        {" "}
                        <span
                          data-uk-icon="icon: list"
                          className="uk-icon"
                        ></span>
                        <span> History</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Profit Split Dropdown */}
              <div className="uk-inline">
                <button
                  className="uk-button uk-button-default button-header uk-button-icon"
                  type="button"
                  onClick={toggleProfitSplitMenu}
                  aria-haspopup="true"
                  aria-expanded={isProfitSplitMenuOpen}
                >
                  <span data-uk-icon="icon: more"></span> Profit Split
                </button>
                <div
                  uk-dropdown="mode: click; pos: bottom-center"
                  hidden={!isProfitSplitMenuOpen}
                  className="uk-dropdown"
                >
                  <ul className="uk-nav uk-dropdown-nav">
                    <li>
                      <Link href="/profit-split">
                        {" "}
                        <span data-uk-icon="icon: laptop"></span>
                        <span> Simulator</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/profit-split-history">
                        {" "}
                        <span data-uk-icon="icon: list"></span>
                        <span> History</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="uk-inline">
                <button
                  className="uk-button uk-button-default button-header uk-button-icon"
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
