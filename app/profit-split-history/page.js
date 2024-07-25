"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import "uikit/dist/css/uikit.min.css";
import withAuth from '@/app/hoc/withAuth';
import axios from 'axios';

const ProfitSplitHistory = ({user}) => {
  const [profitSplits, setProfitSplits] = useState([]);

  useEffect(() => {
    console.log("user",user)
    const fetchProfitSplits = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const userId = user.id;

        const response = await axios.post(
          `http://localhost:8800/api/profit-split`,
          { userId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProfitSplits(response.data.profitSplits);
      } catch (error) {
        console.error("Failed to fetch profit splits", error);
      }
    };

    if (user) {
      fetchProfitSplits();
    }
  }, [user]);

  const formatValue = (value) => {
    if (typeof value === "number") {
      return value.toFixed(2);
    }
    return value;
  };

  const columns = useMemo(() => {
    if (!profitSplits || profitSplits.length === 0) return [];
  
    const keys = profitSplits && Object.keys(profitSplits[0]).filter(
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
  }, [profitSplits]);

  const data = useMemo(() => profitSplits, [profitSplits]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  return (
    <div className="uk-container uk-container-small uk-margin-large-top uk-padding-medium">
      <h2 className="uk-text-center">Profit Split History</h2>
      {profitSplits?.length > 0 ? (
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
      ) : (
        <p>No profit splits available.</p>
      )}
    </div>
  );
};

export default withAuth(ProfitSplitHistory);
