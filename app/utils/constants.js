"use client";

const industrySectors = {
  "Utilities": 6,
  "Healthcare": 5,
  "Telecommunications": 4,
  "Consumer Goods": 3,
  "Technology": 3,
  "Manufacturing": 3,
  "Finance": 2,
  "Retail": 2,
  "Agriculture": 2,
  "Transportation": 2,
  "Real Estate": 1,
  "Energy": 1,
};

const regions = {
  "Northern America": 6,
  "Northern Europe": 6,
  "Oceania": 5,
  "Western Europe": 4,
  "Southern Europe": 4,
  "East Asia": 5,
  "South-East Asia": 3,
  "South Asia": 3,
  "Central Asia": 3,
  "Eastern Europe": 3,
  "North Africa": 3,
  "Southern Africa": 3,
  "South America": 3,
  "Middle East": 3,
  "Central America": 2,
  "East Africa": 2,
  "West Africa": 2,
};

const creditRatings = [
  "Aaa",
  "Aa1",
  "Aa2",
  "Aa3",
  "A1",
  "A2",
  "A3",
  "Baa1",
  "Baa2",
  "Baa3",
  "Ba1",
  "Ba2",
  "Ba3",
  "B1",
  "B2",
  "B3",
  "Caa1",
  "Caa2",
  "Caa3",
  "Ca",
  "C",
];

// Explanations for financial statements relationships
const financialExplanations = {
  loanAmount: "The loan amount is the total sum borrowed by the borrower. A higher loan amount typically increases the lender's risk, which can result in a higher interest rate.",
  collateralValue: "The collateral value is the worth of the asset pledged by the borrower. A higher collateral value reduces the lender's risk, potentially leading to a lower interest rate.",
  debtToIncomeRatio: "The debt-to-income ratio measures the borrower's debt payments compared to their income. A higher ratio indicates higher risk for the lender and can lead to a higher interest rate.",
  loanToValueRatio: "The loan-to-value ratio compares the loan amount to the value of the collateral. A higher ratio suggests greater risk for the lender, which may result in a higher interest rate.",
};

const industriesProfitSplit = [
  'manufacturing',
  'services',
  'technology',
  'retail',
  'finance',
  'healthcare',
  'energy',
  'transportation',
];

const functionsProfitSplit = [
  'manufacturing',
  'R&D',
  'marketing',
  'sales',
  'administration',
  'logistics',
  'holding',
];

export {
  industrySectors,
  regions,
  creditRatings,
  financialExplanations,
  industriesProfitSplit,
  functionsProfitSplit
};
