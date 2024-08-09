import React from "react";

export default function Documentation() {
  return (
    <div className="uk-container uk-margin-large-top uk-margin-large-bottom">
      <h2>Documentation</h2>
      <p>
        This project utilizes synthetic data generation and machine learning models to simulate and predict outcomes related to Transfer Pricing (TP) and Interest Rates, based on guidelines provided by the OECD and sound economic principles.
      </p>

      <h3>1. Profit Split Model and OECD Guidelines</h3>
      <h4>Dataset Generation</h4>
      <p>
        The dataset for the profit split model is generated synthetically to reflect various industries and functions as defined by the OECD's Transfer Pricing Guidelines. These guidelines emphasize that the allocation of profit should be based on the functions performed, assets used, and risks assumed by the entities involved. The synthetic data generation process involves:
      </p>
      <ul>
        <li>
          **Industries and Functions**: We define multiple industries (e.g., manufacturing, services, technology) and functions (e.g., R&D, marketing, sales) that reflect the diverse economic activities of multinational enterprises. The selection of industries and functions is based on common industry classifications and typical functional profiles as outlined by the OECD.
        </li>
        <li>
          **Revenue, Cost, Assets, Liabilities**: Industry-specific multipliers are applied to generate realistic values for revenue, cost, assets, and liabilities. These multipliers are derived from historical data and economic analysis. For instance, manufacturing industries may have higher asset intensity, which is reflected in the dataset through higher multipliers for assets and liabilities.
        </li>
        <li>
          **Profit Allocation Key**: The profit allocation key is calculated based on the weighted assets of headquarters and subsidiaries. This aligns with the OECD's recommendation that profit should be split according to the economic substance, which is often reflected in the allocation of assets and resources.
        </li>
      </ul>
      <h4>Keras Model Features</h4>
      <p>
        The Keras model is designed to predict the profit allocation key using the generated dataset. The key features used in the model include:
      </p>
      <ul>
        <li>
          **One-Hot Encoded Industries and Functions**: Categorical variables such as industry and function are one-hot encoded to create binary features. This allows the model to capture the unique impact of each industry-function combination on the profit allocation.
        </li>
        <li>
          **Scaled Financial Metrics**: Financial metrics such as revenue, cost, assets, and liabilities are standardized to ensure that the model can effectively learn from the data without being influenced by the scale of the inputs.
        </li>
      </ul>
      <p>
        The model is trained to minimize the mean squared error between the predicted and actual profit allocation keys. This ensures that the model's predictions are as close as possible to the true economic distribution of profits as dictated by the OECD guidelines.
      </p>

      <h4>Economic Logic Behind Profit Split</h4>
      <p>
        The profit split method is particularly useful in cases where both parties to a transaction contribute unique and valuable intangibles, or where a high degree of integration between operations exists. The logic is based on the principle that profits should be allocated in accordance with the relative value contributed by each party. The synthetic data generation mimics this by assigning values to assets, functions, and industries, which collectively determine the profit allocation key.
      </p>
      <p>
        The use of weighted assets as a basis for profit allocation follows the economic principle that the allocation of profits should reflect the contribution of economic value. In practice, this means that entities with higher-value assets or more significant operational roles in generating profits should receive a proportionally larger share of those profits.
      </p>

      <h3>2. Interest Rates Model and OECD Guidelines</h3>
      <h4>Dataset Generation</h4>
      <p>
        The dataset for the interest rates model is generated based on various economic factors and credit ratings, following the OECD's guidelines for intercompany financing transactions. The guidelines suggest that the arm's length interest rate should reflect the creditworthiness of the borrower, the terms of the loan, and prevailing market conditions.
      </p>
      <ul>
        <li>
          **Credit Ratings**: The credit ratings are assigned according to Moody’s scale, which is a recognized method for assessing credit risk. This directly influences the interest rates in the dataset, as higher-risk entities are expected to pay higher interest rates.
        </li>
        <li>
          **Sector and Region**: The dataset incorporates industry sectors and geographic regions, as these factors can influence credit risk and, consequently, the interest rate. For example, entities in more stable sectors or regions may have lower interest rates due to perceived lower risk.
        </li>
      </ul>

      <h4>Keras Model Features</h4>
      <p>
        The Keras model for interest rates uses the following features:
      </p>
      <ul>
        <li>
          **Credit Rating Index**: This is an ordinally encoded feature representing the credit rating of the entity. It allows the model to learn the relationship between credit risk and interest rates, aligning with the OECD’s guidance on intercompany financing.
        </li>
        <li>
          **Sector and Region Indices**: These features capture the impact of industry and geographic factors on interest rates. They are mapped to numerical indices to allow the model to consider sectoral and regional variations in credit risk.
        </li>
      </ul>
      <p>
        The model is trained to predict the interest rate based on these features, with the goal of minimizing the mean squared error between predicted and actual rates. This aligns with the OECD’s principle that intercompany loans should be priced similarly to what independent entities would agree to under comparable circumstances.
      </p>

      <h4>Economic Logic Behind Interest Rates</h4>
      <p>
        The determination of interest rates in intercompany loans is guided by economic principles such as risk assessment and the time value of money. Higher credit risk typically demands higher interest rates as compensation for the lender. The dataset reflects this by incorporating credit ratings and other risk-related factors.
      </p>
      <p>
        The OECD guidelines emphasize that interest rates should reflect the economic conditions and creditworthiness of the borrower. This project adheres to these principles by modeling interest rates as a function of credit ratings, industry, and region, ensuring that the predicted rates are economically rational and compliant with international standards.
      </p>

      <h3>3. Beta Project Disclaimer</h3>
      <p>
        This project is currently in beta and is intended for educational and research purposes only. It is not designed for commercial use and should not replace the advice of a professional transfer pricing advisor. The predictions generated by the model are for research purposes and should not be considered binding. The authors of this project do not assume legal responsibility for the outcomes of using these predictions, as they are not intended to serve as legal advice.
      </p>
    </div>
  );
}
