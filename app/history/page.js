"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import "uikit/dist/css/uikit.min.css";
import withAuth from '@/app/hoc/withAuth';
import axios from 'axios';

const History = ({user}) => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const userId = user.id;

        const response = await axios.post(
          `http://localhost:8800/api/loans`,
          { userId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLoans(response.data.loans);
      } catch (error) {
        console.error("Failed to fetch loans", error);
      }
    };

    if (user) {
      fetchLoans();
    }
  }, [user]);

  const formatValue = (value, key) => {
    const keysToFormat = ["loan_amount", "Collateral_value", "annual_income"]; 
    if (keysToFormat.includes(key) && typeof value === "number") {
      const formattedValue = Math.round(value);
      return `${new Intl.NumberFormat('en-US').format(formattedValue)}K $`;
    }

    return value;
  };

  const columns = useMemo(() => {
    if (!loans || loans.length === 0) return [];
  
    const keys = loans && Object.keys(loans[0]).filter(
      (key) =>
        key !== "id" &&
        key !== "createdAt" &&
        key !== "updatedAt" &&
        key !== "UserId"
    );
    return keys.map((key) => ({
      Header: key.replace(/_/g, " "),
      accessor: key,
      Cell: ({ value }) => formatValue(value),
    }));
  }, [loans]);

  const data = useMemo(() => loans, [loans]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  return (
    <div className="uk-container uk-container-small uk-margin-large-top uk-padding-medium">
      <h2 className="uk-text-center">Loan History</h2>
      {loans?.length > 0 ? (
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
        <p>No loans available.</p>
      )}
    </div>
  );
};

export default withAuth(History);
