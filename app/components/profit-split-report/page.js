"use client";

import React from "react";
import { generatePDFReport } from "@/app/utils/helper";
import {
  profitSplitExplanations,
  disclaimerProfitSplit,
} from "@/app/utils/constants";
import ProfitChart from "../profit-chart/page";
import "./styles.css";

const ProfitSplitReport = ({ formData, hqProfit, subsProfit }) => {
  const formatNumberUs = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const reportData = {
    "Headquarters Revenue": `$${formatNumberUs(formData.hq_revenue * 1000)} (${
      profitSplitExplanations.hq_revenue
    } )`,
    "Headquarters Cost": `$${formatNumberUs(formData.hq_cost * 1000)} (${
      profitSplitExplanations.hq_cost
    })`,
    "Headquarters Assets": `$${formatNumberUs(formData.hq_assets * 1000)} (${
      profitSplitExplanations.hq_assets
    })`,
    "Headquarters Liabilities": `$${formatNumberUs(
      formData.hq_liabilities * 1000
    )} (${profitSplitExplanations.hq_liabilities})`,
    "Subsidiary Revenue": `$${formatNumberUs(formData.subs_revenue * 1000)} (${
      profitSplitExplanations.subs_revenue
    })`,
    "Subsidiary Cost": `$${formatNumberUs(formData.subs_cost * 1000)} (${
      profitSplitExplanations.subs_cost
    })`,
    "Subsidiary Assets": `$${formatNumberUs(formData.subs_assets * 1000)} (${
      profitSplitExplanations.subs_assets
    })`,
    "Subsidiary Liabilities": `$${formatNumberUs(
      formData.subs_liabilities * 1000
    )} (${profitSplitExplanations.subs_liabilities})`,
    "Headquarters Industry": `${formData.hq_industry} (${profitSplitExplanations.industry})`,
    "Subsidiary Industry": `${formData.subs_industry} (${profitSplitExplanations.industry})`,
    "Headquarters Function": `${formData.hq_function} (${profitSplitExplanations.function})`,
    "Subsidiary Function": `${formData.subs_function} (${profitSplitExplanations.function})`,
    "Predicted Profit Split (HQ)": `${hqProfit}%`,
    "Predicted Profit Split (Subsidiary)": `${subsProfit}%`,
  };

  const downloadPDF = () => {
    generatePDFReport({
      title: "Profit Split Report",
      reportData,
      disclaimer: disclaimerProfitSplit,
      filename: "ProfitSplitReport",
    });
  };

  return (
    <div className="uk-margin-large">
      <h3 className="uk-heading-line uk-text-center">
        <span>Profit Split Report</span>
      </h3>
      <div
        id="profitChart"
        className="uk-margin-large-top uk-margin-large-bottom"
      >
        <ProfitChart hqProfit={hqProfit} subsProfit={subsProfit} />
      </div>
      <div className="uk-card uk-card-default uk-card-body uk-border-rounded">
        <p>The simulated profit split is as follows:</p>
        <p className="uk-text-bold">
          {" "}
          Profit allocated to the headquarters: {hqProfit}%
        </p>
        <p className="uk-text-bold">
          Profit allocated to the subsidiary: {subsProfit}%
        </p>
        <p className="uk-text-justify">
          The profit split prediction is determined by analyzing a dataset of
          similar companies with comparable characteristics. This analysis is
          conducted through a machine learning model trained on all relevant
          data, including an OECD-compliant approach that considers functions
          performed, risks assumed, and assets employed in the profit allocation
          process. Additionally, the model accounts for the broader economic
          context, including industry-specific factors and the functional
          environment in which the entities operate. However, as the app is
          currently in beta and utilizes sample data, this prediction may not
          represent a fully reliable arm's length profit split.
        </p>
        <p>
          The predicted profit split by the model is based on the following
          factors:
        </p>
        {Object.entries(reportData).map(([key, value], index) => (
          <p key={index}>
            <strong>{key}:</strong> {value}
          </p>
        ))}
        <div className="uk-margin-large-top uk-flex uk-flex-center">
          <button
            className="uk-button button-pdf uk-border-rounded"
            onClick={downloadPDF}
          >
            <span uk-icon="icon: download; ratio: 1.5" />
            <span>Download Report PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfitSplitReport;
