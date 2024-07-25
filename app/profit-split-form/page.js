"use client";
import axios from 'axios';
import { useEffect, useState } from "react";
import "uikit/dist/css/uikit.min.css";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import { industrySectors, functions } from "@/app/utils/constants";
import withAuth from '@/app/hoc/withAuth';

const ProfitSplitForm = () => {
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
    hq_functions: "",
    subs_functions: "",
    hq_industry: "manufacturing",
    subs_industry: "retail",
    hq_function: "R&D",
    subs_function: "sales"
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
        "http://localhost:8800/api/profit-split",
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
        <span>Profit Split Information</span>
      </h1>
      <form onSubmit={handleSubmit} className="uk-form-stacked">
        {[
          { label: "HQ Revenue", name: "hq_revenue" },
          { label: "HQ Cost", name: "hq_cost" },
          { label: "HQ Profit", name: "hq_profit" },
          { label: "HQ Assets", name: "hq_assets" },
          { label: "HQ Liabilities", name: "hq_liabilities" },
          { label: "Subsidiary Revenue", name: "subs_revenue" },
          { label: "Subsidiary Cost", name: "subs_cost" },
          { label: "Subsidiary Profit", name: "subs_profit" },
          { label: "Subsidiary Assets", name: "subs_assets" },
          { label: "Subsidiary Liabilities", name: "subs_liabilities" },
          { label: "HQ Functions", name: "hq_functions" },
          { label: "Subsidiary Functions", name: "subs_functions" },
          { label: "HQ Industry", name: "hq_industry", options: industrySectors },
          { label: "Subsidiary Industry", name: "subs_industry", options: industrySectors },
          { label: "HQ Function", name: "hq_function", options: functions },
          { label: "Subsidiary Function", name: "subs_function", options: functions }
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
      {prediction !== null && (
        <div className="uk-margin uk-alert-success" uk-alert="true">
          <p>Predicted Profit Split: {prediction.toFixed(2)}</p>
          <p>Headquarter Share: {(1 - prediction).toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default withAuth(ProfitSplitForm);
