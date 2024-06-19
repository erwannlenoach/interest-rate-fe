"use client";

import axios from "axios";
import { useState, useEffect } from "react";

const History = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetchLoans();
  }, []);

  useEffect(() => {
    console.log("loans", loans); // This will log the loans array after updates
  }, [loans]);

  const fetchLoans = async () => {
    try {
      const response = await axios.get("http://localhost:8800/api/loans");
      setLoans(response.data.loans); // Assuming the API returns an object with a 'loans' array
    } catch (error) {
      console.log("Error fetching loans", error);
    }
  };

  // Function to filter out unwanted keys
  const filterKeys = (keys) => {
    return keys.filter(key => key !== "id" && key !== "createdAt" && key !== "updatedAt");
  };

  return (
    <div className="uk-container uk-text-center uk-margin-medium-top">
      <h2>Loan History</h2>
      {loans.length > 0 ? (
        <table className="uk-table uk-table-striped uk-margin-medium-bottom">
          <thead>
            <tr>
              {loans.length > 0 && Object.keys(loans[0])
                .filter(key => key !== "id" && key !== "createdAt" && key !== "updatedAt")
                .map(key => (
                  <th key={key}>{key}</th> // Using filtered keys for headers
                ))}
            </tr>
          </thead>
          <tbody>
            {loans.map((loan, index) => (
              <tr key={index}>
                {filterKeys(Object.keys(loans[0])).map(key => (
                  <td key={`${key}-${index}`}>{loan[key]}</td> // Use filtered keys for data cells
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No loans available.</p>
      )}
    </div>
  );
};

export default History;