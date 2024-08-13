"use client";
import axios from "axios";
import { useState } from "react";
import "uikit/dist/css/uikit.min.css";
import UIkit from "uikit";
import { functionsProfitSplit, industriesProfitSplit } from "../utils/constants";
import withAuth from "@/app/hoc/withAuth";
import { jwtDecode } from "jwt-decode";

const ProfitSplit = () => {
  const [formData, setFormData] = useState({
    hq_revenue: "",
    hq_cost: "",
    hq_profit: "",
    hq_assets: "",
    hq_liabilities: "",
    subs_revenue: "",
    subs_cost: "",
    subs_profit: "",
    subs_assets: "",
    subs_liabilities: "",
    hq_industry: "",
    subs_industry: "",
    hq_function: "",
    subs_function: "",
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (typeof window !== "undefined") {
        const token = sessionStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const username = decodedToken.username;

        // Convert the relevant fields from thousands of $ to nominal value
        const formDataToSend = {
          ...formData,
          hq_revenue: parseFloat(formData.hq_revenue) * 1000,
          hq_cost: parseFloat(formData.hq_cost) * 1000,
          hq_profit: parseFloat(formData.hq_profit) * 1000,
          hq_assets: parseFloat(formData.hq_assets) * 1000,
          hq_liabilities: parseFloat(formData.hq_liabilities) * 1000,
          subs_revenue: parseFloat(formData.subs_revenue) * 1000,
          subs_cost: parseFloat(formData.subs_cost) * 1000,
          subs_profit: parseFloat(formData.subs_profit) * 1000,
          subs_assets: parseFloat(formData.subs_assets) * 1000,
          subs_liabilities: parseFloat(formData.subs_liabilities) * 1000,
        };

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/predict-profit-split`,
          { formData: formDataToSend, username }
        );
        setPrediction(response.data.prediction);
      }
    } catch (error) {
      console.error("Failed to submit the form:", error);
      UIkit.notification({
        message: "Error fetching prediction!",
        status: "danger",
      });
    }
  };

  const handleNewSimulation = () => {
    setPrediction(null);
    setFormData({
      hq_revenue: "",
      hq_cost: "",
      hq_profit: "",
      hq_assets: "",
      hq_liabilities: "",
      subs_revenue: "",
      subs_cost: "",
      subs_profit: "",
      subs_assets: "",
      subs_liabilities: "",
      hq_industry: "",
      subs_industry: "",
      hq_function: "",
      subs_function: "",
    });
  };

  const hqProfitSplit = prediction !== null ? Math.max(0, (1 - prediction) * 100).toFixed(2) : "0.00";
  const subsProfitSplit = prediction !== null ? Math.max(0, prediction * 100).toFixed(2) : "0.00";

  return (
    <div className="uk-container uk-container-small uk-margin-large-top uk-padding-large">
      <h1 className="uk-text-center uk-margin-large-bottom">
        <span>PROFIT SPLIT SIMULATOR</span>
      </h1>
      <form onSubmit={handleSubmit} className="uk-form-stacked">
        <fieldset className="uk-fieldset">
          <legend className="uk-legend">Headquarters</legend>
          {[
            { 
              label: "Revenue (in thousands of $)", 
              name: "hq_revenue", 
              min: 1000, 
              max: 1000000, 
              step: 1000,
              tooltip: "Enter the headquarters' revenue in thousands of dollars as per the latest financial statements."
            },
            { 
              label: "Cost (in thousands of $)", 
              name: "hq_cost", 
              min: 1000, 
              max: 1000000, 
              step: 1000,
              tooltip: "Enter the headquarters' costs in thousands of dollars as per the latest financial statements."
            },
            { 
              label: "Profit (in thousands of $)", 
              name: "hq_profit", 
              min: 1000, 
              max: 1000000, 
              step: 1000,
              tooltip: "Enter the headquarters' profit in thousands of dollars as per the latest financial statements."
            },
            { 
              label: "Assets (in thousands of $)", 
              name: "hq_assets", 
              min: 1000, 
              max: 1000000, 
              step: 1000,
              tooltip: "Enter the total assets of the headquarters in thousands of dollars as per the latest financial statements."
            },
            { 
              label: "Liabilities (in thousands of $)", 
              name: "hq_liabilities", 
              min: 1000, 
              max: 1000000, 
              step: 1000,
              tooltip: "Enter the total liabilities of the headquarters in thousands of dollars as per the latest financial statements."
            },
            {
              label: "Industry",
              name: "hq_industry",
              options: industriesProfitSplit,
              tooltip: "Select the industry in which the headquarters operates."
            },
            {
              label: "Function",
              name: "hq_function",
              options: functionsProfitSplit,
              tooltip: "Select the primary function of the headquarters."
            },
          ].map((field, index) => (
            <div className="uk-margin" key={index}>
              <label className="uk-form-label" htmlFor={field.name}>
                {field.label}{" "}
                <span 
                  uk-icon="icon: question; ratio: 0.75" 
                  uk-tooltip={field.tooltip}
                  className="uk-icon"
                ></span>
              </label>
              <div className="uk-form-controls">
                {field.options ? (
                  <select
                    className="uk-select"
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Please select...</option>
                    {field.options.map((option, idx) => (
                      <option key={`${field.name}-${idx}`} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="uk-input"
                    id={field.name}
                    type="number"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    required
                  />
                )}
              </div>
            </div>
          ))}
        </fieldset>
        <fieldset className="uk-fieldset uk-margin-top">
          <legend className="uk-legend">Subsidiary</legend>
          {[
            { 
              label: "Revenue (in thousands of $)", 
              name: "subs_revenue", 
              min: 1000, 
              max: 1000000, 
              step: 1000,
              tooltip: "Enter the subsidiary's revenue in thousands of dollars as per the latest financial statements."
            },
            { 
              label: "Cost (in thousands of $)", 
              name: "subs_cost", 
              min: 1000, 
              max: 1000000, 
              step: 1000,
              tooltip: "Enter the subsidiary's costs in thousands of dollars as per the latest financial statements."
            },
            { 
              label: "Profit (in thousands of $)", 
              name: "subs_profit", 
              min: 1000, 
              max: 1000000, 
              step: 1000,
              tooltip: "Enter the subsidiary's profit in thousands of dollars as per the latest financial statements."
            },
            { 
              label: "Assets (in thousands of $)", 
              name: "subs_assets", 
              min: 1000, 
              max: 1000000, 
              step: 1000,
              tooltip: "Enter the total assets of the subsidiary in thousands of dollars as per the latest financial statements."
            },
            { 
              label: "Liabilities (in thousands of $)", 
              name: "subs_liabilities", 
              min: 1000, 
              max: 1000000, 
              step: 1000,
              tooltip: "Enter the total liabilities of the subsidiary in thousands of dollars as per the latest financial statements."
            },
            {
              label: "Industry",
              name: "subs_industry",
              options: industriesProfitSplit,
              tooltip: "Select the industry in which the subsidiary operates."
            },
            {
              label: "Function",
              name: "subs_function",
              options: functionsProfitSplit,
              tooltip: "Select the primary function of the subsidiary."
            },
          ].map((field, index) => (
            <div className="uk-margin" key={index}>
              <label className="uk-form-label" htmlFor={field.name}>
                {field.label}{" "}
                <span 
                  uk-icon="icon: question; ratio: 0.75" 
                  uk-tooltip={field.tooltip}
                  className="uk-icon"
                ></span>
              </label>
              <div className="uk-form-controls">
                {field.options ? (
                  <select
                    className="uk-select"
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Please select...</option>
                    {field.options.map((option, idx) => (
                      <option key={`${field.name}-${idx}`} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="uk-input"
                    id={field.name}
                    type="number"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    required
                  />
                )}
              </div>
            </div>
          ))}
        </fieldset>
        {!prediction && (
          <div className="uk-margin uk-flex uk-flex-center uk-flex-middle uk-margin-medium-top">
            <button
              type="submit"
              className="uk-button uk-button-primary uk-border-rounded"
            >
              Submit
            </button>
          </div>
        )}
      </form>
      {prediction !== null && (
        <div
          className="uk-margin uk-alert-success uk-text-center"
          uk-alert="true"
        >
          <p className="uk-text-large">
            <strong>Predicted Profit Split:</strong>
          </p>
          <p>
            Profit split allocated to the headquarter: {hqProfitSplit}%
          </p>
          <p>
            Profit allocated to the subsidiary: {subsProfitSplit}%
          </p>
          <div className="uk-margin uk-flex uk-flex-center uk-flex-middle">
            <button
              type="button"
              className="uk-button uk-button-primary uk-border-rounded"
              onClick={handleNewSimulation}
            >
              Run New Simulation
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(ProfitSplit);
