"use client";

import React from "react";
import "uikit/dist/css/uikit.min.css";
import PageTitle from "../components/page-title/page";

export default function Documentation() {
  return (
    <section
      id="documentation"
      className="uk-section uk-section-muted uk-padding-large"
    >
      <div className="uk-container">
        <PageTitle title="DOCUMENTATION" />
        
        {/* Index of Contents */}
        <div className="uk-card uk-card-primary uk-card-body uk-margin">
          <h3 className="uk-card-title">Table of Contents</h3>
          <ul className="uk-list uk-list-divider">
            <li><a href="#concept-of-nostra">Concept of Nostra</a></li>
            <li><a href="#how-to-use">How to Use the App</a></li>
            <li><a href="#interest-rates-model">Interest Rates Model</a></li>
            <li><a href="#profit-split-model">Profit Split Model</a></li>
          </ul>
        </div>
        
        {/* Concept of Nostra */}
        <div id="concept-of-nostra" className="uk-card uk-card-secondary uk-card-body uk-margin">
          <h3 className="uk-card-title">Concept of Nostra</h3>
          <p>
            Nostra is an experimental app designed to facilitate the
            determination of arm's length prices for financial transactions and
            the overall management of transfer pricing. Nostra is currently
            available for TP analysis of interest rates and profit splits. The
            sections below provide detailed insights into the machine learning
            processes that drive these transfer pricing predictions.
          </p>
        </div>

        {/* How to Use the App */}
        <div id="how-to-use" className="uk-card uk-card-default uk-card-body uk-margin">
          <h3 className="uk-card-title">How to Use the App</h3>
          <p>
            The Nostra app provides an intuitive process for generating interest
            rate and profit split predictions, as well as managing the resulting
            reports. Here’s a step-by-step guide:
          </p>

          <h4 className="uk-heading-bullet">1. Filling Out the Form to Generate Predictions</h4>
          <p>
            Each form in the Nostra app collects specific data points necessary
            for generating a prediction. For example, in the <strong>Interest
            Rates Form</strong>, you will be prompted to enter information such
            as income, debt, loan amount, collateral value, and other relevant
            factors. After entering the data, submit the form to generate the prediction.
          </p>

          <h4 className="uk-heading-bullet">2. Viewing the Prediction Report</h4>
          <p>
            Once the form is submitted, the app will return a prediction, such as the interest rate or profit split, based on the provided data. This prediction will be displayed in a report format within the app.
          </p>

          <h4 className="uk-heading-bullet">3. Downloading the Prediction Report</h4>
          <p>
            After generating the prediction, you can download the report as a PDF by clicking the download icon. This feature allows you to keep a record of each prediction.
          </p>

          <h4 className="uk-heading-bullet">4. Accessing Historical Data</h4>
          <p>
            All past simulations are stored in the app's history sections, such as <strong>Interest Rates History</strong> and <strong>Profit Split History</strong>. These sections display a table of all previous predictions, allowing you to review, download individual reports, delete entries, and export the data as a CSV file.
          </p>
        </div>

        {/* Interest Rates Model */}
        <div id="interest-rates-model" className="uk-card uk-card-default uk-card-body uk-margin">
          <h3 className="uk-card-title">Interest Rates Model</h3>
          <p>
            The interest rates model is designed to predict the appropriate
            interest rate for loans between related parties, simulating the
            decision-making process of an independent lender. The model is built
            using a neural network trained on synthetic data that reflects
            various economic and financial factors relevant to determining
            interest rates.
          </p>

          <h4 className="uk-heading-bullet">Step-by-Step Breakdown</h4>

          <h5>Data Collection and Preparation</h5>
          <p>
            Nostra currently uses sample data through the generation of a dataset used for machine learning purposes.
            The dataset for training the interest rates model is generated
            synthetically to cover a wide range of possible scenarios. The following features of the generated loans are used for the training of the model.
          </p>
          <ul className="uk-list uk-list-bullet">
            <li>
              <strong>Debt to Income Ratio (DTI):</strong> Reflects the
              borrower’s financial health, varying between 10% and 60%.
            </li>
            <li>
              <strong>Loan to Value Ratio (LTV):</strong> Represents the
              borrower’s equity in the collateral, varying between 50% and 120%.
            </li>
            <li>
              <strong>Annual Income:</strong> Varies from $30,000 to $200,000,
              representing different borrower profiles.
            </li>
            <li>
              <strong>Loan Amount:</strong> Varies from $5,000 to $500,000,
              covering small to medium-sized loans.
            </li>
            <li>
              <strong>Collateral Value:</strong> Ranges from $10,000 to
              $1,000,000, representing the assets securing the loan.
            </li>
            <li>
              <strong>Region, Sector, Credit Rating:</strong> These are chosen
              based on realistic distributions, reflecting political stability,
              industry risk, and creditworthiness.
            </li>
          </ul>

          <h5>Feature Selection and Target Variable</h5>
          <p> The above features are used for the training of the model as they
            simulate the factors an independent lender would consider when
            determining an interest rate.
          </p>

          <h5>Modeling</h5>
          <p>A neural network model is trained on this synthetic data:</p>
          <ul className="uk-list uk-list-bullet">
            <li>
              <strong>Neural Network Architecture:</strong> The model consists
              of multiple layers, including Dense layers and Dropout layers to
              prevent overfitting.
            </li>
            <li>
              <strong>Training Process:</strong> The model is trained using the
              mean squared error loss function and the Adam optimizer, with
              training data split into training, validation, and test sets to
              ensure the model generalizes well to new data.
            </li>
            <li>
              <strong>Normalization:</strong> Features are normalized to ensure
              that the model learns efficiently, with each feature contributing
              proportionately to the prediction.
            </li>
          </ul>

          <h5>Evaluation and Prediction</h5>
          <p>
            The model's accuracy is evaluated by comparing its predictions on
            the test set with actual interest rates. The model's ability to
            generalize to new, unseen data ensures that the predicted rates are
            consistent with those that would be set by independent lenders in an
            arm's length transaction.
          </p>

          <h5>Justification</h5>
          <p>
            The model is designed to replicate real-world lending practices,
            ensuring that its predictions adhere to the arm's length principle.
            By considering various risk factors and simulating independent
            decision-making processes, the model provides a robust tool for
            setting intra-group interest rates.
          </p>
        </div>

        {/* Profit Split Model */}
        <div id="profit-split-model" className="uk-card uk-card-secondary uk-card-body uk-margin">
          <h3 className="uk-card-title">Profit Split Model</h3>
          <p>
            The profit split model is used to determine the distribution of
            profits between related entities based on their contributions to
            value creation. The model ensures that the allocation of profits
            aligns with the economic substance of the transactions, reflecting
            the arm's length principle.
          </p>

          <h4 className="uk-heading-bullet">Step-by-Step Breakdown</h4>

          <h5>Synthetic Data Generation</h5>
          <p>The synthetic dataset for the profit split model includes:</p>
          <ul className="uk-list uk-list-bullet">
            <li>
              <strong>Industries and Functions:</strong> The data covers various
              industries and functions for both headquarters and subsidiaries.
            </li>
            <li>
              <strong>Industry-Specific Multipliers:</strong> Revenue, cost,
              assets, and liabilities are adjusted using industry-specific
              multipliers to simulate realistic financial scenarios.
            </li>
          </ul>

          <h5>Profit Allocation Key Calculation</h5>
          <p>
            The model calculates a profit allocation key based on weighted
            assets, reflecting the economic contributions of each entity. This
            key determines the share of profits allocated to headquarters versus
            subsidiaries.
          </p>

          <h5>Modeling</h5>
          <p>
            A neural network model is trained to predict the profit allocation
            key:
          </p>
          <ul className="uk-list uk-list-bullet">
            <li>
              <strong>Neural Network Architecture:</strong> The model includes
              layers designed to capture complex relationships between features
              and the profit allocation key.
            </li>
            <li>
              <strong>Training Process:</strong> The model is trained on
              synthetic data with the objective of learning how to fairly
              allocate profits based on economic contributions.
            </li>
            <li>
              <strong>Feature Encoding:</strong> Categorical features such as
              industry and function are one-hot encoded to allow the model to
              learn from different categories effectively.
            </li>
          </ul>

          <h5>Evaluation and Prediction</h5>
          <p>
            The model's predictions are compared against actual profit splits in
            the test data, ensuring that the model accurately reflects the arm's
            length principle in allocating profits.
          </p>

          <h5>Justification</h5>
          <p>
            By training on a wide range of synthetic scenarios, the model is
            able to generalize how profits should be split between entities,
            based on their economic substance and contributions. This approach
            ensures that the profit splits are consistent with independent,
            arm's length transactions.
          </p>
        </div>
      </div>
    </section>
  );
}
