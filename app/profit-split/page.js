"use client";
import axios from 'axios'
import { useEffect, useState } from "react";
import "uikit/dist/css/uikit.min.css";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import { regions } from "@/app/utils/constants";
import withAuth from '@/app/hoc/withAuth';

const profitSplit = () => {
  const [formData, setFormData] = useState({
    Debt_to_Income_Ratio: "",
  });

  useEffect(() => {
    UIkit.use(Icons);
  }, []);


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
      const response = await axios.post(
        "http://localhost:8800/profit-split",
        formData
      );
      setPrediction(response.data.prediction);
      UIkit.notification({
        message: "Prediction received!",
        status: "success",
      });
    } catch (error) {
      console.error("Failed to submit the form:", error);
      UIkit.notification({
        message: "Error fetching prediction!",
        status: "danger",
      });
    }
  };

  return (
    <div className="uk-container uk-container-small uk-margin-large-top uk-padding-medium">
      <h1 className="uk-text-center">
        <span>Loan Information</span>
      </h1>
      <form onSubmit={handleSubmit} className="uk-form-stacked">
        {[
          { label: "Loan Amount", name: "Loan_Amount" },
          { label: "Region", name: "Region", options: regions },
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
        <div className="uk-margin">
          <button type="submit" className="uk-button uk-button-primary">
            Submit
          </button>
        </div>
      </form>
      {prediction && (
        <div className="uk-margin uk-alert-success" uk-alert="true">
          <p>Profit Split: {prediction}</p>
        </div>
      )}
    </div>
  );
};

export default withAuth(profitSplit);
