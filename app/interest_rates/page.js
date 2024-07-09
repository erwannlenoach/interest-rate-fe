// pages/interest_rates.js
"use client";
import React from "react";
import LoanForm from "../components/loan-form/page";
import withAuth from "../hoc/withAuth";

const InterestRates = () => {
  return (
    <div className="uk-container">
      <LoanForm />
    </div>
  );
};

export default withAuth(InterestRates);
