"use client";

import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect, useLayoutEffect } from "react";
import "uikit/dist/css/uikit.min.css";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import "./styles.css";

export default function Header() {
  const [userName, setUserName] = useState(null);

  useLayoutEffect(() => {
    UIkit.use(Icons);
    UIkit.update();
  }, []);

  const { token, logout, user } = useAuth();

  useEffect(() => {
    if (user) {
      setUserName(user?.email);
    }
  }, [user]);

  return (
    <header>
      <nav className="uk-background-secondary uk-navbar custom-navbar">
        <div className="uk-navbar-left navbar-logo">
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
        <div className="navbar-elements-container">
          {token ? (
            <>
              {/* Interest Rates Dropdown */}
              <div className="uk-inline">
                <button
                  className="uk-button uk-button-default button-header uk-button-icon uk-flex uk-flex-middle"
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={false} // Always false since we rely on hover
                >
                  <span uk-icon="icon: arrow-up-right; ratio: 1.5"></span>{" "}
                  <span className="uk-margin-small-left"> Interest Rates</span>

                </button>
                <div
                  uk-dropdown="mode: hover; pos: bottom-center"
                  className="uk-dropdown uk-border-rounded"
                >
                  <ul className="uk-nav uk-dropdown-nav">
                    <li>
                      <Link href="/interest-rates">
                        <span uk-icon="icon: laptop; ratio: 1.5"></span>{" "}
                        <span className="uk-margin-small-left"> Simulator</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/interest-rates-history">
                        {" "}
                        <span
                          uk-icon="icon: list; ratio: 1.5"
                          className="uk-icon"
                        ></span>
                        <span className="uk-margin-small-left"> History</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Profit Split Dropdown */}
              <div className="uk-inline">
                <button
                  className="uk-button uk-button-default button-header uk-button-icon uk-flex uk-flex-middle"
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={false} // Always false since we rely on hover
                >
                  <span uk-icon="icon: more; ratio: 1.5"></span> 
                  <span className="uk-margin-small-left"> Profit Split</span>
                </button>
                <div
                  uk-dropdown="mode: hover; pos: bottom-center"
                  className="uk-dropdown uk-border-rounded"
                >
                  <ul className="uk-nav uk-dropdown-nav">
                    <li>
                      <Link href="/profit-split">
                        {" "}
                        <span uk-icon="icon: laptop; ratio: 1.5"></span>
                        <span className="uk-margin-small-left"> Simulator</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/profit-split-history">
                        {" "}
                        <span uk-icon="icon: list; ratio: 1.5"></span>
                        <span className="uk-margin-small-left"> History</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Documentation Link */}
              <div className="uk-inline div-icon-docs">
              <Link href="/documentation" style={{ textDecoration: 'none' }}>
              <button
                    className="uk-button uk-button-default button-header uk-button-icon uk-flex uk-flex-middle"
                    type="button"
                    aria-haspopup="true"
                  >
                    <span
                      uk-icon="icon: info; ratio: 1.5"
                      className="uk-icon"
                    ></span>
                    <span className="uk-margin-small-left">  Documentation</span>
                  </button>
                </Link>
              </div>

              <div className="uk-inline div-icon-user">
                <button
                  className="uk-button uk-button-default button-header uk-button-icon uk-flex uk-flex-middle"
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={false} // Always false since we rely on hover
                >
                  <span
                    uk-icon="icon: user; ratio: 1.5"
                    className="uk-icon"
                  ></span>
                </button>
                <div
                  uk-dropdown="mode: hover; pos: bottom-center"
                  className="uk-dropdown uk-border-rounded"
                >
                  <div className="uk-card uk-card-body uk-card-default uk-margin-bottom uk-text-center">
                    <span
                      uk-icon="icon: mail; ratio: 1.5"
                      className="uk-icon"
                    ></span>
                    <p className="uk-card-title uk-text-center">{userName}</p>
                  </div>
                  <ul className="uk-nav uk-dropdown-nav">
                    <li>
                      <Link href="/profile" passHref>
                        <span
                          uk-icon="icon: settings; ratio: 1.5"
                          className="uk-icon"
                        ></span>
                        Account Settings
                      </Link>
                    </li>
                    <li>
                      <a onClick={logout}>
                        <span
                          uk-icon="icon: sign-out; ratio: 1.5"
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
            <div className="uk-inline div-icon-user">
              <button
                className="uk-button-icon"
                type="button"
                aria-haspopup="true"
                aria-expanded={false} // Always false since we rely on hover
              >
                <span
                  uk-icon="icon: user; ratio: 1.5"
                  className="uk-icon"
                ></span>
              </button>
              <div
                uk-dropdown="mode: hover; pos: bottom-center"
                className="uk-dropdown uk-border-rounded"
              >
                <ul className="uk-nav uk-dropdown-nav header-dropdown">
                  <li>
                    <Link href="/signup" passHref>
                      <span
                        uk-icon="icon: file-edit; ratio: 1.5"
                        className="uk-icon"
                      ></span>
                      Sign Up
                    </Link>
                  </li>
                  <li>
                    <Link href="/login" passHref>
                      <span
                        uk-icon="icon: sign-in; ratio: 1.5"
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
