"use client";

import React, { useState, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import "uikit/dist/css/uikit.min.css";
import withAuth from "@/app/hoc/withAuth";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import './styles.css'


const ProfitSplitHistory = () => {
  const { user } = useAuth();
  const [profitSplits, setProfitSplits] = useState([]);

  const fetchProfitSplits = async () => {
    try {
      if (typeof window !== "undefined") {
        const token = sessionStorage.getItem("token");
        const userId = user.id;

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/profit-split`,
          { userId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProfitSplits(response.data.profitSplits);
      }
    } catch (error) {
      console.error("Failed to fetch profit splits", error);
    }
  };

  fetchProfitSplits();

  const formatValue = (value, key) => {
    const keysToFormat = ["loan_amount", "Collateral_value", "annual_income"];
    if (keysToFormat.includes(key) && typeof value === "number") {
      const formattedValue = Math.round(value / 1000);
      return `${new Intl.NumberFormat("en-US").format(formattedValue)}K $`;
    }

    return value;
  };

  const columns = useMemo(() => {
    if (!profitSplits || profitSplits.length === 0) return [];

    const keys =
      profitSplits &&
      Object.keys(profitSplits[0]).filter(
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
  }, [profitSplits]);

  const data = useMemo(() => profitSplits, [profitSplits]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

    const downloadCSV = () => {
      const csvData = profitSplits.map((row) =>
        columns
          .map((col) => formatValue(row[col.accessor], col.accessor))
          .join(",")
      );
      const csvHeader = columns.map((col) => col.Header).join(",");
      const csvContent = [csvHeader, ...csvData].join("\n");
  
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "profit_split_history.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

  return (
    <div className="uk-container uk-margin-large-top uk-padding-medium table">
      <h2 className="uk-text-center uk-margin-large-bottom">Profit Split History</h2>
      {profitSplits?.length > 0 ? (
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
                      {...column.getHeaderProps(column.getSortByToggleProps())}
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
              className="uk-button button-download uk-margin-right uk-border-rounded"
              onClick={downloadCSV}
            >
              <span uk-icon="icon: download; ratio: 1.5"></span>{" "}
              Download CSV
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
    <div className="uk-container">
      <p className="uk-padding">No data available.</p>
      <Link href="/profit-rates">
        <span uk-icon="icon: laptop; ratio: 1.5"></span>{" "}
        <span>New Simulation</span>
      </Link>
    </div>
  )}
    </div>
  );
};

export default withAuth(ProfitSplitHistory);
