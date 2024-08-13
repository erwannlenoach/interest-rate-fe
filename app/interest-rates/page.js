"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import "uikit/dist/css/uikit.min.css";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import { industrySectors, regions, creditRatings } from "@/app/utils/constants";
import withAuth from "@/app/hoc/withAuth";
import { jwtDecode } from "jwt-decode";

const InterestRatesForm = () => {
  const [formData, setFormData] = useState({
    Debt_to_Income_Ratio: "",
    Loan_to_Value_Ratio: "",
    Annual_Income: "",
    Loan_Amount: "",
    Loan_Term_Years: "",
    Subordination: "",
    Collateral_Value: "",
    Sector: "Finance",
    Region: "Northern Europe",
    Assigned_Credit_Rating: "B1",
  });

  const [prediction, setPrediction] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    UIkit.use(Icons);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = sessionStorage.getItem("token");
      setToken(storedToken);
    }
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
      if (token) {
        const decodedToken = jwtDecode(token);
        const username = decodedToken.username;

        const formDataToSend = {
          ...formData,
          Loan_Amount: parseFloat(formData.Loan_Amount) * 1000,
          Collateral_Value: parseFloat(formData.Collateral_Value) * 1000,
          Annual_Income: parseFloat(formData.Annual_Income) * 1000,
        };

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/predict-loans`,
          {
            formData: formDataToSend,
            username,
          }
        );
        setPrediction(response.data.prediction);
        UIkit.notification({
          message: "Prediction received!",
          status: "success",
        });
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
    setFormData({
      Debt_to_Income_Ratio: "",
      Loan_to_Value_Ratio: "",
      Annual_Income: "",
      Loan_Amount: "",
      Loan_Term_Years: "",
      Subordination: "",
      Collateral_Value: "",
      Sector: "Finance",
      Region: "Northern Europe",
      Assigned_Credit_Rating: "B1",
    });
  };

  return (
    <div className="uk-container uk-container-small uk-margin-large-top uk-padding-large">
      <h1 className="uk-text-center uk-margin-large-bottom">
        <span>INTEREST RATES SIMULATOR</span>
      </h1>
      <form onSubmit={handleSubmit} className="uk-form-stacked">
        {[
          { 
            label: "Loan Amount (in thousands of $)", 
            name: "Loan_Amount", 
            min: 1000, 
            max: 1000000, 
            step: 1000,
            tooltip: "Enter the amount of the loan in thousands of dollars. The value should be between $1 million and $1 trillion."
          },
          { 
            label: "Collateral Value (in thousands of $)", 
            name: "Collateral_Value", 
            min: 1000, 
            max: 1000000, 
            step: 1000,
            tooltip: "Enter the collateral value associated with the loan in thousands of dollars. The value should match the significance of the loan amount."
          },
          { 
            label: "Loan Term Years", 
            name: "Loan_Term_Years", 
            min: 0.25, 
            max: 50, 
            step: 0.25,
            tooltip: "Enter the duration of the loan in years. It should be at least 3 months (0.25 years) and no more than 50 years."
          },
          { 
            label: "Loan to Value Ratio", 
            name: "Loan_to_Value_Ratio", 
            min: 0, 
            max: 100, 
            step: 0.01,
            tooltip: "Enter the loan to value ratio as a percentage. The value should be between 0% and 100%."
          },
          { 
            label: "Debt to Income Ratio", 
            name: "Debt_to_Income_Ratio", 
            min: 0, 
            max: 100, 
            step: 0.01,
            tooltip: "Enter the debt to income ratio as a percentage. The value should be between 0% and 100%."
          },
          { 
            label: "Annual Income of the borrower (in thousands of $)", 
            name: "Annual_Income", 
            min: 10, 
            max: 100000, 
            step: 10,
            tooltip: "Enter the borrower's annual income in thousands of dollars. The value should be between $10,000 and $100 billion."
          },
          { 
            label: "Sector", 
            name: "Sector", 
            options: industrySectors,
            tooltip: "Select the sector in which the borrower operates."
          },
          { 
            label: "Region", 
            name: "Region", 
            options: regions,
            tooltip: "Select the region where the borrower is based."
          },
          { 
            label: "Assigned Credit Rating", 
            name: "Assigned_Credit_Rating", 
            options: creditRatings,
            tooltip: "Select the credit rating assigned to the borrower."
          },
          { 
            label: "Subordination", 
            name: "Subordination",
            tooltip: "Enter any subordination details related to the loan."
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
        <div
          className="uk-margin uk-alert-success uk-text-center"
          uk-alert="true"
        >
          <p className="uk-text-large">
            <strong>Predicted Interest Rate:</strong> {`${prediction}%`}
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

export default withAuth(InterestRatesForm);
