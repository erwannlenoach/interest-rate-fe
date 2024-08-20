"use client";
import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import {
  industrySectors,
  regions,
  creditRatings,
  financialExplanations,
} from "@/app/utils/constants";

const InterestRateReport = ({ prediction, formData, calculatedData }) => {
  const sectorName = formData.Sector;
  const regionName = formData.Region;

  const report = {
    "Debt-to-Income Ratio": `${calculatedData.debtToIncomeRatio.toFixed(4)} (${
      financialExplanations.debtToIncomeRatio
    })`,
    "Loan-to-Value Ratio": `${calculatedData.loanToValueRatio.toFixed(4)} (${
      financialExplanations.loanToValueRatio
    })`,
    "Loan Amount": `$${(formData.Loan_Amount / 1000).toLocaleString()}K (${
      financialExplanations.loanAmount
    })`,
    "Collateral Value": `$${(
      formData.Collateral_Value / 1000
    ).toLocaleString()}K (${financialExplanations.collateralValue})`,
    "Loan Term (Years)": formData.Loan_Term_Years,
    Subordination: formData.Subordination,
    Sector: `${sectorName} (Index: ${industrySectors[sectorName]}/6)`,
    Region: `${regionName} (Index: ${regions[regionName]}/6)`,
    "Assigned Credit Rating": `${formData.Assigned_Credit_Rating} (Index: ${
      creditRatings.indexOf(formData.Assigned_Credit_Rating) + 1
    }/21)`,
    "Predicted Interest Rate": `${prediction}%`,
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Loan Interest Rate Report", 20, 20);

    doc.setFontSize(12);
    doc.text(
      "This report provides a detailed analysis of the factors influencing the predicted interest rate.",
      20,
      30
    );

    // Add table with report details
    doc.autoTable({
      startY: 40,
      head: [["Factor", "Value"]],
      body: Object.entries(report).map(([key, value]) => [key, value]),
      styles: { halign: "left" },
      margin: { top: 10, left: 20, right: 20 },
    });

    // Disclaimer about the ML model and its beta version
    doc.text(
      "The interest rate prediction was generated using a machine learning model trained on sample data. " +
        "This model aims to provide an arm's length price comparable to market standards, " +
        "but as the app is currently in beta, the results may not represent a 100% reliable arm's length price.",
      20,
      doc.autoTable.previous.finalY + 20
    );

    doc.save("InterestRateReport.pdf");
  };

  return (
    <div className="uk-margin-large">
      <h3 className="uk-heading-line uk-text-center">
        <span>Loan Report</span>
      </h3>
      <div className="uk-card uk-card-default uk-card-body uk-border-rounded">
        <p>
          The interest rate prediction is determined by analyzing a dataset of
          similar loans with comparable characteristics. This analysis is run
          through a machine learning model trained on all relevant data, aiming
          to approximate an arm's length price. However, as the app is currently
          in beta and utilizes sample data, this prediction may not represent a
          fully reliable arm's length price.
        </p>
        <p>
          The predicted interest rate for this loan is based on the following
          factors:
        </p>
        {Object.entries(report).map(([key, value], index) => (
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
