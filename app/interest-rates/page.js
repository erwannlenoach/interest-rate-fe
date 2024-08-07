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

        // Convert the relevant fields from thousands to nominal value
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
          { label: "Loan Amount (in thousands)", name: "Loan_Amount" },
          {
            label: "Collateral Value (in thousands)",
            name: "Collateral_Value",
          },
          { label: "Loan Term Years", name: "Loan_Term_Years" },
          { label: "Loan to Value Ratio", name: "Loan_to_Value_Ratio" },
          { label: "Debt to Income Ratio", name: "Debt_to_Income_Ratio" },
          { label: "Annual Income (in thousands)", name: "Annual_Income" },
          { label: "Sector", name: "Sector", options: industrySectors },
          { label: "Region", name: "Region", options: regions },
          {
            label: "Assigned Credit Rating",
            name: "Assigned_Credit_Rating",
            options: creditRatings,
          },
          { label: "Subordination", name: "Subordination" },
        ].map((field, index) => (
          <div className="uk-margin" key={index}>
            <label className="uk-form-label" htmlFor={field.name}>
              {field.label}
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
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                />
              )}
            </div>
          </div>
        ))}
        {!prediction && (
          <div className="uk-margin uk-flex uk-flex-center uk-flex-middle">
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
