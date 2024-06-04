import financialConstants from "../utils/constant";

const History = () => {
  const loanData = [
    {
      DTI: "25%",
      LVR: "80%",
      INCOME: "$100,000",
      LOAN_AMOUNT: "$250,000",
      COLLATERAL: "$300,000",
      POLITICAL: "Stable",
      SECTOR: "Technology",
      LOAN_TERM: "30 years",
      COMPANY_CREDIT_RATING: "A",
      SUBORDINATION: "Senior",
      INTEREST_RATE: "3%",
    },
    {
      DTI: "25%",
      LVR: "80%",
      INCOME: "$100,000",
      LOAN_AMOUNT: "$250,000",
      COLLATERAL: "$300,000",
      POLITICAL: "Stable",
      SECTOR: "Technology",
      LOAN_TERM: "30 years",
      COMPANY_CREDIT_RATING: "A",
      SUBORDINATION: "Senior",
      INTEREST_RATE: "4%",
    },
  ];

  return (
    <div className="uk-container uk-text-center uk-margin-medium-top">
      <h2>Loan History</h2>
      <table className="uk-table uk-table-striped uk-margin-medium-bottom">
        <thead>
          <tr>
            {Object.keys(financialConstants).map((key) => (
              <th key={key}>{financialConstants[key]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loanData.map((loan, index) => (
            <tr key={index}>
              {Object.keys(financialConstants).map((key) => (
                <td key={key}>{loan[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
