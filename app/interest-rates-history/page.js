"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import "uikit/dist/css/uikit.min.css";
import withAuth from "@/app/hoc/withAuth";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const interestRatesHistory = () => {
  const { user } = useAuth();
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const userId = user.id;

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/loans`,
          { userId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLoans(response.data.loans);
      } catch (error) {
        console.error("Failed to fetch loans", error);
      }
    };

    fetchLoans();
  }, [user]);

  const formatValue = (value, key) => {
    const keysToFormat = ["loan_amount", "Collateral_value", "annual_income"];
    if (keysToFormat.includes(key) && typeof value === "number") {
      const formattedValue = Math.round(value);
      return `${new Intl.NumberFormat("en-US").format(formattedValue)}K $`;
    }

    return value;
  };

  const columns = useMemo(() => {
    if (!loans || loans.length === 0) return [];

    const keys =
      loans &&
      Object.keys(loans[0]).filter(
        (key) =>
          key !== "id" &&
          key !== "createdAt" &&
          key !== "updatedAt" &&
          key !== "UserId"
      );
    return keys.map((key) => ({
      Header: key.replace(/_/g, " "),
      accessor: key,
      Cell: ({ value }) => formatValue(value, key),
    }));
  }, [loans]);

  const data = useMemo(() => loans, [loans]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  // Function to convert data to CSV format and trigger download
  const downloadCSV = () => {
    const csvData = loans.map((row) =>
      columns.map((col) => formatValue(row[col.accessor], col.accessor)).join(",")
    );
    const csvHeader = columns.map((col) => col.Header).join(",");
    const csvContent = [csvHeader, ...csvData].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "loans_history.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to handle new simulation (could be a redirect or an action)
  const runNewSimulation = () => {
    // Redirect to a simulation page or trigger a simulation process
    window.location.href = "/simulation"; // Replace with your actual simulation URL
  };

  return (
    <div className="uk-container uk-container-small uk-margin-large-top uk-padding-medium">
      <h2 className="uk-text-center">Loan History</h2>
      {loans?.length > 0 ? (
        <>
          <div className="uk-overflow-auto">
            <table
              {...getTableProps()}
              className="uk-table uk-table-striped uk-table-hover uk-table-divider uk-margin-medium-bottom"
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        style={{ cursor: "pointer" }}
                      >
                        {column.render("Header")}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " 🔽"
                              : " 🔼"
                            : ""}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="uk-flex uk-flex-center uk-flex-middle uk-margin-top">
            <button
              className="uk-button uk-button-primary uk-margin-right"
              onClick={downloadCSV}
            >
              Download CSV
            </button>
            <button
              className="uk-button uk-button-secondary"
              onClick={runNewSimulation}
            >
              Run New Simulation
            </button>
          </div>
        </>
      ) : (
        <p className="uk-padding">No loans available.</p>
      )}
    </div>
  );
};

export default withAuth(interestRatesHistory);
