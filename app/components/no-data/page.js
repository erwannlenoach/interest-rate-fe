import React from "react";
import Link from "next/link";
import "uikit/dist/css/uikit.min.css";

const NoDataAvailable = ({ gifSrc, buttonText, buttonUrl }) => {
  return (
    <div className="uk-container uk-text-center uk-margin-large-top">
      <img
        src={gifSrc}
        alt="No Data Available"
        style={{ maxWidth: "700px", margin: "20px auto" }}
      />
      <div className="uk-margin-large-top">
        <Link href={buttonUrl}>
          <button className="uk-button uk-button-primary uk-border-rounded">
            <span uk-icon="icon: laptop; ratio: 1.5"></span>{" "}
            <span>{buttonText}</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NoDataAvailable;
