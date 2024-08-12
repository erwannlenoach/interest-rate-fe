"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import withAuth from "@/app/hoc/withAuth";
import axios from "axios";
import UIkit from "uikit"; // Import UIkit for the modal
import { useAuth } from "../context/AuthContext";
import NoDataAvailable from "../components/no-data/page";
import Link from "next/link";
import "./styles.css";

const InterestRatesHistory = () => {
  const { user } = useAuth();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

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
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error("Failed to fetch loans", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchLoans();
  }, [user]);

  const handleDeleteLoan = async (loanId) => {
    UIkit.modal.confirm("Are you sure you want to delete this loan?").then(
      async function () {
        try {
          const token = sessionStorage.getItem("token");
          await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/loans/${loanId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setLoans(loans.filter((loan) => loan.id !== loanId));
          UIkit.notification({ message: "Loan deleted successfully!", status: "success" });
        } catch (error) {
          console.error("Failed to delete loan", error);
          UIkit.notification({ message: "Failed to delete loan!", status: "danger" });
        }
      },
      function () {
        UIkit.notification({ message: "Loan deletion canceled!", status: "warning" });
      }
    );
  };

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

    return [
      ...keys.map((key) => ({
        Header: key.replace(/_/g, " "),
        accessor: key,
        Cell: ({ value }) => formatValue(value, key),
      })),
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <span
            uk-icon="icon: trash; ratio: 1.5"
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => handleDeleteLoan(row.original.id)}
          />
        ),
      },
    ];
  }, [loans]);

  const data = useMemo(() => loans, [loans]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  const downloadCSV = () => {
    const csvData = loans.map((row) =>
      columns
        .filter((col) => col.accessor !== "actions") // Exclude the actions column
        .map((col) => formatValue(row[col.accessor], col.accessor))
        .join(",")
    );
    const csvHeader = columns
      .filter((col) => col.accessor !== "actions") // Exclude the actions column
      .map((col) => col.Header)
      .join(",");
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

  return (
    <div className="uk-container uk-padding-medium table">
      <h1 className="uk-text-center uk-margin-large-bottom">
        <span>INTEREST RATES HISTORY</span>
      </h1>
      {loading ? ( // Show a loading state while fetching data
        <div className="uk-text-center uk-margin-large-top">
          <div uk-spinner="ratio: 3"></div>
          <p>Loading data...</p>
        </div>
      ) : loans?.length > 0 ? (
        <>
          <div className="uk-overflow-auto">
            <table
              {...getTableProps()}
              className="uk-table uk-table-striped uk-table-hover uk-table-divider uk-margin-large-bottom"
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
                      <td>
                        <span
                          uk-icon="icon: trash; ratio: 1.5"
                          style={{ cursor: "pointer", color: "red" }}
                          onClick={() => handleDeleteLoan(row.original.id)}
                        ></span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="uk-flex uk-flex-center uk-flex-middle uk-margin-top">
            <button
              className="uk-button button-download uk-margin-right uk-border-rounded"
              onClick={downloadCSV}
            >
              <span uk-icon="icon: download; ratio: 1.5"></span> Download CSV
            </button>
            <button className="uk-button  uk-border-rounded">
              <Link href="/interest-rates">
                <span uk-icon="icon: laptop; ratio: 1.5"></span>{" "}
                <span>New Simulation</span>
              </Link>
            </button>
          </div>
        </>
      ) : (
        <NoDataAvailable
          gifSrc="/travolta-desert.gif"
          buttonText="New Simulation"
          buttonUrl="/interest-rates"
        />
      )}
    </div>
  );
};

export default withAuth(InterestRatesHistory);
