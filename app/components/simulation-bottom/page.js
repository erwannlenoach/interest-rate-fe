"use client";
import React from "react";
import Link from "next/link";

const SimulationButtons = ({
  onNewSimulationClick,
  historyLink,
  newSimulationLabel = "Run New Simulation",
  historyLabel = "View History",
  newSimulationIcon = "refresh",
  historyIcon = "list",
}) => {
  return (
    <div className="uk-margin uk-flex uk-flex-center uk-flex-middle">
      <button
        type="button"
        className="uk-button uk-button-primary uk-border-rounded uk-margin-large-right"
        onClick={onNewSimulationClick}
      >
        <span uk-icon={`icon: ${newSimulationIcon}; ratio: 1.5`} className="uk-icon"></span>
        {newSimulationLabel}
      </button>
      <Link href={historyLink}>
        <button
          type="button"
          className="uk-button uk-button-secondary uk-border-rounded"
        >
          <span uk-icon={`icon: ${historyIcon}; ratio: 1.5`} className="uk-icon"></span>
          {historyLabel}
        </button>
      </Link>
    </div>
  );
};

export default SimulationButtons;
