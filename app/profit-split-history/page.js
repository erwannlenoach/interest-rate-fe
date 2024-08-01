"use client";

import React, { useState, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import "uikit/dist/css/uikit.min.css";
import withAuth from "@/app/hoc/withAuth";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

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

  return (
    <div className="uk-container uk-container-small uk-margin-large-top uk-padding-medium">
      <h2 className="uk-text-center">Profit Split History</h2>
      {profitSplits?.length > 0 ? (
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
      ) : (
        <p>No profit splits available.</p>
      )}
    </div>
  );
};

export default withAuth(ProfitSplitHistory);
