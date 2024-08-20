"use client";

import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { profitSplitExplanations } from "@/app/utils/constants";
import ProfitChart from "../profit-chart/page";

const ProfitSplitReport = ({ formData, hqProfit, subsProfit }) => {
  const report = {
    "Headquarters Revenue": `$${(
      formData.hq_revenue / 1000
    ).toLocaleString()}K (${profitSplitExplanations.hq_revenue})`,
    "Headquarters Cost": `$${(formData.hq_cost / 1000).toLocaleString()}K (${
      profitSplitExplanations.hq_cost
    })`,
    "Headquarters Assets": `$${(
      formData.hq_assets / 1000
    ).toLocaleString()}K (${profitSplitExplanations.hq_assets})`,
    "Headquarters Liabilities": `$${(
      formData.hq_liabilities / 1000
    ).toLocaleString()}K (${profitSplitExplanations.hq_liabilities})`,
    "Subsidiary Revenue": `$${(
      formData.subs_revenue / 1000
    ).toLocaleString()}K (${profitSplitExplanations.subs_revenue})`,
    "Subsidiary Cost": `$${(formData.subs_cost / 1000).toLocaleString()}K (${
      profitSplitExplanations.subs_cost
    })`,
    "Subsidiary Assets": `$${(
      formData.subs_assets / 1000
    ).toLocaleString()}K (${profitSplitExplanations.subs_assets})`,
    "Subsidiary Liabilities": `$${(
      formData.subs_liabilities / 1000
    ).toLocaleString()}K (${profitSplitExplanations.subs_liabilities})`,
    "Headquarters Industry": `${formData.hq_industry} (${profitSplitExplanations.industry})`,
    "Subsidiary Industry": `${formData.subs_industry} (${profitSplitExplanations.industry})`,
    "Headquarters Function": `${formData.hq_function} (${profitSplitExplanations.function})`,
    "Subsidiary Function": `${formData.subs_function} (${profitSplitExplanations.function})`,
    "Predicted Profit Split (HQ)": `${hqProfit}%`,
    "Predicted Profit Split (Subsidiary)": `${subsProfit}%`,
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Profit Split Report", 20, 20);

    doc.setFontSize(12);
    doc.text(
      "This report provides a detailed analysis of the factors influencing the predicted profit split.",
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
      "The profit split prediction was generated using a machine learning model trained on sample data. " +
        "This model aims to provide an arm's length profit allocation comparable to market standards, " +
        "but as the app is currently in beta, the results may not represent a 100% reliable arm's length allocation.",
      20,
      doc.autoTable.previous.finalY + 20
    );

    // Add the Profit Chart
    const canvas = document.querySelector("#profitChart canvas");
    const imgData = canvas.toDataURL("image/png");
    doc.addImage(
      imgData,
      "PNG",
      15,
      doc.autoTable.previous.finalY + 40,
      180,
      90
    );

    doc.save("ProfitSplitReport.pdf");
  };

  return (
    <div className="uk-margin-large">
      <h3 className="uk-heading-line uk-text-center">
        <span>Profit Split Report</span>
      </h3>
      <div className="uk-card uk-card-default uk-card-body uk-border-rounded">
        <p>
          The profit split prediction is determined by analyzing a dataset of
          similar companies with comparable characteristics. This analysis is
          run through a machine learning model trained on all relevant data,
          aiming to approximate an arm's length allocation. However, as the app
          is currently in beta and utilizes sample data, this prediction may not
          represent a fully reliable arm's length profit split.
        </p>
        <p>
          The predicted profit split for this simulation is based on the
          following factors:
        </p>
        {Object.entries(report).map(([key, value], index) => (
          <p key={index}>
            <strong>{key}:</strong> {value}
          </p>
        ))}
      </div>
      <div id="profitChart" className="uk-margin-large-top">
        <ProfitChart hqProfit={hqProfit} subsProfit={subsProfit} />
      </div>
      <div className="uk-margin-large-top uk-flex uk-flex-center">
        <button className="uk-button uk-button-secondary" onClick={downloadPDF}>
          Download Report as PDF
        </button>
      </div>
    </div>
  );
};

export default ProfitSplitReport;
