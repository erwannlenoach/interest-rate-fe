import React from "react";
import Link from "next/link";
import "uikit/dist/css/uikit.min.css";
import './styles.css'

const NoDataAvailable = ({ message, buttonText, buttonUrl }) => {
  return (
    <div className="uk-container uk-flex uk-flex-column uk-flex-middle uk-flex-center uk-height-medium uk-margin-large-bottom">
        <div className="uk-text-center uk-margin-large-top">
          <p className="uk-text-large"> No {message} simulation recorded for this account.</p>
        </div>
        <Link href={buttonUrl}>
          <button className="uk-button uk-button-primary uk-border-rounded uk-margin-large-top">
            <span uk-icon="icon: laptop; ratio: 1.5"></span>{" "}
            <span>{buttonText}</span>
          </button>
        </Link>
    </div>
  );
};

export default NoDataAvailable;
