"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import withAuth from "@/app/hoc/withAuth";
import axios from "axios";
import UIkit from "uikit";
import { useAuth } from "../context/AuthContext";
import NoDataAvailable from "../components/no-data/page";
import CustomButton from "../components/history-bottom/page";
import PageTitle from "../components/page-title/page";
import {
  industrySectors,
  regions,
  creditRatings,
  financialExplanations,
  disclaimerInterestRate,
} from "../utils/constants";
import moment from "moment";
import { generatePDFReport } from "@/app/utils/helper";
import "./styles.css";

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
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch loans", error);
        setLoading(false);
      }
    };

    fetchLoans();
  }, [user]);

  const handleDownloadReport = (loanData) => {
    const formatNumberUs = (num) => {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const reportData = {
      "Debt-to-Income Ratio": `${loanData.debt_to_income_ratio.toFixed(2)} (${
        financialExplanations.debtToIncomeRatio
      })`,
      "Loan-to-Value Ratio": `${loanData.loan_to_value_ratio.toFixed(2)} (${
        financialExplanations.loanToValueRatio
      })`,
      "Loan Amount": `$${formatNumberUs(loanData.loan_amount * 1000)} (${
        financialExplanations.loanAmount
      })`,
      "Collateral Value": `$${formatNumberUs(
        loanData.collateral_value * 1000
      )} (${financialExplanations.collateralValue})`,
      "Loan Term (Years)": `${loanData.loan_term_years} (${financialExplanations.loanTerm})`,
      Subordination: `${loanData.subordination} (${financialExplanations.subordination})`,
      Sector: `${loanData.sector} (Index: ${loanData.sector_index}/6) (${financialExplanations.sector})`,
      Region: `${loanData.region} (Index: ${loanData.political_stability_index}/6) (${financialExplanations.region})`,
      "Assigned Credit Rating": `${
        loanData.company_credit_rating_value !== undefined
          ? `${creditRatings[loanData.company_credit_rating_value]} (Index: ${
              loanData.company_credit_rating_value + 1
            }/21)`
          : "None"
      }`,
      "Predicted Interest Rate": `${loanData.interest_rate.toFixed(2)}%`,
    };

    generatePDFReport({
      title: "Loan Interest Rate Report",
      reportData,
      disclaimer: disclaimerInterestRate,
      filename: `InterestRateReport_${loanData.id}`,
    });
  };

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
      const formattedValue = Math.round(value / 1000); // Convert to thousands for CSV
      return `${new Intl.NumberFormat("en-US").format(formattedValue)}K $`;
    }

    if (keysToFormatPercentage.includes(key) && typeof value === "number") {
      return `${Math.round(value * 100)}%`;
    }

    if (key === "interest_rate" && typeof value === "number") {
      return `${value.toFixed(2)}%`;
    }

    if (key === "company_credit_rating_value" && typeof value === "number") {
      return creditRatings[value] || "Unknown Rating";
    }

    if (["createdAt", "updatedAt"].includes(key) && value) {
      return moment(value).format("DD-MM-YYYY HH:mm:ss");
    }

    return value;
  };

  const formatValueCsv = (value, key) => {
    const keysToFormatPercentage = [
      "debt_to_income_ratio",
      "loan_to_value_ratio",
    ];

    if (keysToFormatPercentage.includes(key) && typeof value === "number") {
      return `${Math.round(value * 100)}%`;
    }

    if (key === "interest_rate" && typeof value === "number") {
      return `${value.toFixed(2)}%`;
    }

    if (key === "company_credit_rating_value" && typeof value === "number") {
      return creditRatings[value] || "Unknown Rating";
    }

    if (["createdAt", "updatedAt"].includes(key) && value) {
      return moment(value).format("DD-MM-YYYY HH:mm:ss");
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
          key !== "interest_rate" &&
          key !== "sector_index" &&
          key !== "political_stability_index"
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
        if (key === "createdAt") headerLabel = "Created at";
        if (key === "updatedAt") headerLabel = "Updated at";
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
          <div className="actions-container">
            <span
              uk-icon="icon: download; ratio: 1.5"
              className="action-icon download-icon"
              uk-tooltip="Download this report"
              onClick={() => handleDownloadReport(row.original)}
            />
            <span
              uk-icon="icon: trash; ratio: 1.5"
              className="action-icon delete-icon"
              onClick={() => handleDeleteLoan(row.original.id)}
            />
          </div>
        ),
      },
    ];
  }, [loans]);

  const data = useMemo(() => loans, [loans]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  const downloadCSV = () => {
    if (!loans || loans.length === 0) {
      return;
    }

    const keys = Object.keys(loans[0]).filter(
      (key) => key !== "id" && key !== "UserId"
    );

    const csvHeader = keys.join(",");

    const csvData = loans.map((row) => {
      return keys
        .map((key) => {
          let value = row[key];

          return formatValueCsv(value, key);
        })
        .join(",");
    });

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
                          minWidth: "150px",
                          whiteSpace: "normal",
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
          <div className="uk-grid uk-flex uk-flex-center uk-flex-middle uk-margin-top uk-margin-bottom container-buttom-history">
            <CustomButton
              onClick={downloadCSV}
              icon="download"
              label="Download CSV"
              variant="green"
            />
            <CustomButton
              href="/interest-rates"
              icon="laptop"
              label="New Simulation"
              variant="primary"
            />
          </div>
        </>
      ) : (
        <NoDataAvailable
          message="interest rates"
          buttonText="New Simulation"
          buttonUrl="/interest-rates"
        />
      )}
    </div>
  );
};

export default withAuth(InterestRatesHistory);
