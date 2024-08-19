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
        <div className="uk-card uk-card-secondary uk-card-body uk-margin">
          <h3 className="uk-card-title">Concept of Nostra</h3>
          <p>
            Determining transfer pricing can be time-consuming and often
            requires expensive databases and analytical tools. Nostra is
            designed to facilitate the determination of arm's length prices for
            financial transactions, while also managing these transactions
            throughout the fiscal years. With Nostra, simply use the simulators,
            input the required financial data, and instantly receive an arm's
            length price—it's that simple. Nostra is currently available for TP
            analysis of interest rates and profit splits. The sections below
            provide detailed insights into the machine learning processes that
            drive these transfer pricing predictions.
          </p>
        </div>

        <div className="uk-card uk-card-default uk-card-body uk-margin">
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
            The dataset for training the interest rates model is generated
            synthetically to cover a wide range of possible scenarios.
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
          <p>
            Key features such as Credit_Rating_Index, Sector_Index, and
            Region_Index are used to predict the Interest_Rate. These features
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

        <div className="uk-card uk-card-secondary uk-card-body uk-margin">
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
              industries (e.g., manufacturing, services) and functions (e.g.,
              R&D, marketing) for both headquarters and subsidiaries.
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

        <div className="uk-card uk-card-default uk-card-body uk-margin">
          <h3 className="uk-card-title">Synthetic Data Generation Process</h3>
          <p>
            The synthetic data generation process involves creating diverse
            scenarios that reflect realistic market conditions. This includes:
          </p>
          <ul className="uk-list uk-list-bullet">
            <li>
              <strong>Random Sampling:</strong> Values for factors like Debt to
              Income Ratio, Loan to Value Ratio, and Annual Income are randomly
              sampled within predefined ranges.
            </li>
            <li>
              <strong>Categorical Variables:</strong> Region, Sector, and Credit
              Rating are chosen based on distributions that reflect real-world
              scenarios, ensuring that the data is varied and representative.
            </li>
          </ul>

          <h4 className="uk-heading-bullet">Realism Considerations</h4>
          <p>
            While the data generation process is designed to create a wide range
            of realistic scenarios, there are some limitations:
          </p>
          <ul className="uk-list uk-list-bullet">
            <li>
              <strong>Risk of Similar Data:</strong> Synthetic data can result
              in similar data points, which may reduce the diversity of the
              dataset and affect model performance.
            </li>
            <li>
              <strong>Lack of Outliers:</strong> Predefined ranges may limit the
              occurrence of extreme cases, leading to a model that performs less
              effectively on outlier data.
            </li>
            <li>
              <strong>Overtraining:</strong> The model might overfit to patterns
              in the synthetic data, affecting its ability to generalize to
              real-world data.
            </li>
          </ul>

          <h4 className="uk-heading-bullet">Limitations of Synthetic Data</h4>
          <p>The reliance on synthetic data introduces certain limitations:</p>
          <ul className="uk-list uk-list-bullet">
            <li>
              <strong>Compliance Limitations:</strong> While synthetic data
              provides a broad training set, it does not reflect actual
              transactions. This limits the model’s ability to fully comply with
              the arm's length principle as defined by the OECD.
            </li>
            <li>
              <strong>Legal Robustness:</strong> In legal scenarios, the
              synthetic nature of the data might be scrutinized. The models are
              better suited as compliance tools rather than primary evidence in
              legal disputes.
            </li>
          </ul>
        </div>

        <div className="uk-card uk-card-primary uk-card-body uk-margin">
          <h3 className="uk-card-title ">Use and Limitations</h3>
          <p>
            The interest rate and profit split models are powerful tools for
            ensuring compliance with transfer pricing regulations. They are
            designed to simulate arm's length transactions, ensuring that
            intra-group interest rates and profit allocations are consistent
            with what independent entities would agree upon. However, due to
            their reliance on synthetic data, these models should be used
            primarily as compliance tools. For legal defense, especially in
            contentious transfer pricing cases, real-world transaction data is
            essential to complement the model's outputs.
          </p>
        </div>
      </div>
    </section>
  );
}
