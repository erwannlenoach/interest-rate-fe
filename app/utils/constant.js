const industrySectors = [
  "Utilities",
  "Healthcare",
  "Telecommunications",
  "Consumer Goods",
  "Technology",
  "Manufacturing",
  "Finance",
  "Retail",
  "Agriculture",
  "Transportation",
  "Real Estate",
  "Energy"
];

const regions = [
  "Northern America",
  "Northern Europe",
  "Oceania",
  "Western Europe",
  "Southern Europe",
  "East Asia",
  "South-East Asia",
  "South Asia",
  "Central Asia",
  "Eastern Europe",
  "North Africa",
  "Southern Africa",
  "South America",
  "Middle East",
  "Central America",
  "East Africa",
  "West Africa"
];

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
  "C"
];

const mockLoans = [
  {
    debt_to_income_ratio: 0.4,
    loan_to_value_ratio: 0.7,
    annual_income: 60000,
    loan_amount: 20000,
    collateral_value: 25000,
    political_stability_index: 3,
    sector_index: 2,
    loan_term_years: 5,
    company_credit_rating_value: 7,
    subordination: 1,
    interest_rate: 5,
  },
];

module.exports = { industrySectors, regions, creditRatings };
