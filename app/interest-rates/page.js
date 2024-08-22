"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import "uikit/dist/css/uikit.min.css";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import { useAuth } from "../context/AuthContext";
import { industrySectors, regions, creditRatings } from "@/app/utils/constants";
import withAuth from "@/app/hoc/withAuth";
import PageTitle from "../components/page-title/page";
import InterestRateReport from "../components/interest-rate-report/page";
import SimulationButtons from "../components/simulation-bottom/page";

const InterestRatesForm = () => {
  const [formData, setFormData] = useState({
    Debt: "",
    Income: "",
    Loan_Amount: "",
    Collateral_Value: "",
    Loan_Term_Years: "",
    Subordination: "",
    Sector: "",
    Region: "",
    Assigned_Credit_Rating: "None", 
  });

  const [prediction, setPrediction] = useState(null);
  const [formDisabled, setFormDisabled] = useState(false); 
  const [calculatedData, setCalculatedData] = useState({});

  const { user } = useAuth();

  useEffect(() => {
    UIkit.use(Icons);
  }, []);

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
      if (user) {
        const email = user?.email;

        const debtToIncomeRatio =
          parseFloat(formData.Debt) / parseFloat(formData.Income);
        const loanToValueRatio =
          parseFloat(formData.Loan_Amount) /
          parseFloat(formData.Collateral_Value);

        const formDataToSend = {
          Debt_to_Income_Ratio: debtToIncomeRatio.toFixed(4),
          Loan_to_Value_Ratio: loanToValueRatio.toFixed(4),
          Loan_Amount: parseFloat(formData.Loan_Amount) * 1000,
          Collateral_Value: parseFloat(formData.Collateral_Value) * 1000,
          Annual_Income: parseFloat(formData.Income) * 1000,
          Loan_Term_Years: formData.Loan_Term_Years,
          Subordination: formData.Subordination,
          Sector: formData.Sector,
          Region: formData.Region,
          Assigned_Credit_Rating:
            formData.Assigned_Credit_Rating === "None"
              ? null
              : formData.Assigned_Credit_Rating,
        };

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/predict-loans`,
          {
            formData: formDataToSend,
            email,
          }
        );
        setPrediction(parseFloat(response.data.prediction).toFixed(2));
        setCalculatedData({ debtToIncomeRatio, loanToValueRatio }); 
        setFormDisabled(true); 
      } else {
        UIkit.notification({
          message: "No token found!",
          status: "warning",
        });
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
    setFormDisabled(false); 
  };

  return (
    <div className="uk-container uk-container-small uk-margin-large">
      <PageTitle title="INTEREST RATES SIMULATOR" />
      <form onSubmit={handleSubmit} className="uk-form-stacked">
        <fieldset className="uk-fieldset" hidden={formDisabled}> 
          {[
            {
              label: "Income of the borrower (in thousands of $)",
              name: "Income",
              min: 1,
              max: 1000000,
              tooltip: "Enter the total annual income in thousands of dollars.",
            },
            {
              label: "Liabilities of the borrower (in thousands of $)",
              name: "Debt",
              min: 1,
              max: 1000000,
              tooltip:
                "Enter the total liabilities amount in thousands of dollars.",
            },
            {
              label: "Loan Amount (in thousands of $)",
              name: "Loan_Amount",
              min: 100,
              max: 1000000,
              tooltip: "Enter the amount of the loan in thousands of dollars.",
            },
            {
              label: "Collateral Value (in thousands of $)",
              name: "Collateral_Value",
              max: 1000000,
              tooltip:
                "Enter the collateral value associated with the loan in thousands of dollars.",
            },
            {
              label: "Loan Term Years",
              name: "Loan_Term_Years",
              min: 0.25,
              max: 50,
              step: 0.25,
              tooltip: "Enter the duration of the loan in years.",
            },
            {
              label: "Subordination",
              name: "Subordination",
              min: 1,
              max: 10,
              tooltip:
                "Enter the subordination rank related to the loan between 1 (least subordinated) to 10 (most subordinated).",
            },
            {
              label: "Sector",
              name: "Sector",
              options: Object.keys(industrySectors),
              tooltip: "Select the sector in which the borrower operates.",
            },
            {
              label: "Region",
              name: "Region",
              options: Object.keys(regions),
              tooltip: "Select the region where the borrower is based.",
            },
            {
              label: "Assigned Credit Rating",
              name: "Assigned_Credit_Rating",
              options: ["None", ...creditRatings], 
              tooltip: "Select the credit rating assigned to the borrower.",
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
      {prediction && (
        <InterestRateReport
          prediction={prediction}
          formData={formData}
          calculatedData={calculatedData}
        />
      )}

      {prediction && (
        <SimulationButtons
          onNewSimulationClick={handleNewSimulation}
          historyLink="/interest-rates-history"
          newSimulationLabel="Run New Simulation"
          historyLabel="View Interest Rates History"
          newSimulationIcon="refresh"
          historyIcon="list"
        />
      )}
    </div>
  );
};

export default withAuth(InterestRatesForm);
