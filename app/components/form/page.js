"use client";

import { useState } from "react";
import "uikit/dist/css/uikit.min.css";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
UIkit.use(Icons);

const LoanForm = () => {
  const [formData, setFormData] = useState({
    debt_to_income_ratio: "",
    loan_to_value_ratio: "",
    annual_income: "",
    loan_amount: "",
    collateral_value: "",
    political_stability_index: "",
    sector_index: "",
    loan_term_years: "",
    company_credit_rating_value: "",
    subordination: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    return;
  };

  return (
    <div className="uk-container uk-container-small uk-margin-large-top uk-padding-medium">
      <h1 className="uk-text-center">
        <span>Loan Information</span>
      </h1>
      <form onSubmit={handleSubmit} className="uk-form-stacked">
        {[
          { label: "Debt to Income Ratio", name: "debt_to_income_ratio" },
          { label: "Loan to Value Ratio", name: "loan_to_value_ratio" },
          { label: "Annual Income", name: "annual_income" },
          { label: "Loan Amount", name: "loan_amount" },
          { label: "Collateral Value", name: "collateral_value" },
          {
            label: "Political Stability Index",
            name: "political_stability_index",
          },
          { label: "Sector Index", name: "sector_index" },
          { label: "Loan Term Years", name: "loan_term_years" },
          {
            label: "Company Credit Rating Value",
            name: "company_credit_rating_value",
          },
          { label: "Subordination", name: "subordination" },
        ].map((field, index) => (
          <div className="uk-margin" key={index}>
            <label className="uk-form-label" htmlFor={field.name}>
              {field.label}
            </label>
            <div className="uk-form-controls">
              <input
                className="uk-input"
                id={field.name}
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        ))}
        <div className="uk-margin">
          <button type="submit" className="uk-button uk-button-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoanForm;
