"use client";
import React from "react";
import { generatePDFReport } from "@/app/utils/helper";
import {
  industrySectors,
  regions,
  creditRatings,
  financialExplanations,
  disclaimerInterestRate,
} from "@/app/utils/constants";

const InterestRateReport = ({ prediction, formData, calculatedData }) => {
  const sectorName = formData.Sector;
  const regionName = formData.Region;

  const formatNumberUs = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const reportData = {
    "Debt-to-Income Ratio": `${calculatedData.debtToIncomeRatio.toFixed(2)} (${
      financialExplanations.debtToIncomeRatio
    })`,
    "Loan-to-Value Ratio": `${calculatedData.loanToValueRatio.toFixed(2)} (${
      financialExplanations.loanToValueRatio
    })`,
    "Loan Amount": `$${formatNumberUs(formData.Loan_Amount * 1000)} (${
      financialExplanations.loanAmount
    })`,
    "Collateral Value": `$${formatNumberUs(
      formData.Collateral_Value * 1000
    )} (${financialExplanations.collateralValue})`,
    "Loan Term (Years)": `${formData.Loan_Term_Years} (${financialExplanations.loanTerm})`,
    Subordination: `${formData.Subordination} (${financialExplanations.subordination})`,
    Sector: `${sectorName} (Index: ${industrySectors[sectorName]}/6) (${financialExplanations.sector})`,
    Region: `${regionName} (Index: ${regions[regionName]}/6) (${financialExplanations.region})`,
    "Assigned Credit Rating": `${formData.Assigned_Credit_Rating} (Index: ${
      creditRatings.indexOf(formData.Assigned_Credit_Rating) + 1
    }/21)`,
    "Predicted Interest Rate": `${prediction}%`,
  };

  const downloadPDF = () => {
    generatePDFReport({
      title: "Interest Rate Report",
      reportData,
      disclaimer: disclaimerInterestRate,
      filename: "InterestRateReport",
    });
  };

  return (
    <div className="uk-margin-large">
      <h3 className="uk-heading-line uk-text-center">
        <span>Loan Report</span>
      </h3>
      <div className="uk-card uk-card-default uk-card-body uk-border-rounded">
        <p className="uk-text-bold">
          The predicted interest rate for the loan is {prediction} %.{" "}
        </p>
        <p className="uk-text-justify">
          The interest rate prediction is determined by analyzing a dataset of
          similar loans with comparable characteristics. This analysis is run
          through a machine learning model trained on all relevant data, aiming
          to approximate an arm's length price. However, as the app is currently
          in beta and utilizes sample data, this prediction may not represent a
          fully reliable arm's length price.
        </p>
        <p>
          The prediction of the interest rates by the model is based on the
          following factors:
        </p>
        {Object.entries(reportData).map(([key, value], index) => (
          <p key={index}>
            <strong>{key}:</strong> {value}
          </p>
        ))}
      </div>
      <div className="uk-margin-large-top uk-flex uk-flex-center">
        <button className="uk-button uk-button-secondary" onClick={downloadPDF}>
          Download Report as PDF
        </button>
      </div>
    </div>
  );
};

export default InterestRateReport;
