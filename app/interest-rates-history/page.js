"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import withAuth from "@/app/hoc/withAuth";
import axios from "axios";
import UIkit from "uikit";
import { useAuth } from "../context/AuthContext";
import NoDataAvailable from "../components/no-data/page";
import PageTitle from "../components/page-title/page";
import Link from "next/link";
import "./styles.css";
import { industrySectors, regions, creditRatings } from "../utils/constants"; 
import moment from "moment"

const InterestRatesHistory = () => {
  const { user } = useAuth();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const userId = user?.id;

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
          await axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/api/loans/${loanId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setLoans(loans.filter((loan) => loan.id !== loanId));
          UIkit.notification({
            message: "Loan deleted successfully!",
            status: "success",
          });
        } catch (error) {
          console.error("Failed to delete loan", error);
          UIkit.notification({
            message: "Failed to delete loan!",
            status: "danger",
          });
        }
      },
      function () {
        UIkit.notification({
          message: "Loan deletion canceled!",
          status: "warning",
        });
      }
    );
  };

  const formatValue = (value, key) => {
    const keysToFormat = ["loan_amount", "collateral_value", "annual_income"];
    const keysToFormatPercentage = [
      "debt_to_income_ratio",
      "loan_to_value_ratio",
    ];

    if (keysToFormat.includes(key) && typeof value === "number") {
      const formattedValue = Math.round(value);
      return `${new Intl.NumberFormat("en-US").format(formattedValue)}K $`;
    }

    if (keysToFormatPercentage.includes(key) && typeof value === "number") {
      return `${Math.round(value * 100)}%`;
    }

    if (key === "interest_rate" && typeof value === "number") {
      return `${value.toFixed(2)}%`;
    }

    if (key === "sector_index" && typeof value === "number") {
      return industrySectors[value] || "Unknown Sector";
    }

    if (key === "political_stability_index" && typeof value === "number") {
      return regions[value] || "Unknown Region";
    }

    if (key === "company_credit_rating_value" && typeof value === "number") {
      return creditRatings[value] || "Unknown Rating";
    }

    if (["createdAt", "updatedAt"].includes(key) && value) {
      return moment(value).format('DD-MM-YYYY HH:mm:ss');
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
          key !== "UserId" &&
          key !== "interest_rate" 
      );
      return [
        {
          Header: "Index",
          accessor: (row, index) => index + 1,
          disableSortBy: true, 
        },
        {
          Header: "Interest Rate",
          accessor: "interest_rate",
          Cell: ({ value }) => formatValue(value, "interest_rate"),
        },
        ...keys.map((key) => {
          let headerLabel = key.replace(/_/g, " ");
          if (key === "sector_index") headerLabel = "Sector"; 
          if (key === "political_stability_index") headerLabel = "Location"; 
          return {
            Header: headerLabel,
            accessor: key,
            Cell: ({ value }) => formatValue(value, key),
          };
        }),
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
    const csvData = loans.map((row, index) =>
      [
        index + 1, // Include the index in the CSV download
        ...columns
          .filter((col) => col.accessor !== "actions")
          .map((col) => formatValue(row[col.accessor], col.accessor)),
      ].join(",")
    );
    const csvHeader = ["Index", "Interest Rate", ...columns
      .filter((col) => col.accessor !== "actions")
      .map((col) => col.Header)]
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
    <div className="uk-container uk-padding-medium table uk-margin-large container-interest-rates-history">
      <PageTitle title="INTEREST RATES HISTORY" />
      {loading ? (
        <div className="uk-text-center uk-margin-large-top">
          <div uk-spinner="ratio: 3"></div>
          <p>Loading data...</p>
        </div>
      ) : loans?.length > 0 ? (
        <>
          <div className="uk-overflow-auto">
            <table
              {...getTableProps()}
              className="uk-table uk-table-divider uk-table-striped uk-table-hover uk-table-divider uk-margin-large-bottom"
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        style={{
                          cursor: "pointer",
                          minWidth: "150px", // Adjust this to make the headers wider
                          whiteSpace: "normal", // Allow text to wrap into multiple lines
                        }}
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
          <div className="uk-flex uk-flex-center uk-flex-middle uk-margin-top  uk-margin-bottom">
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
