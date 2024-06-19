"use client";

import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import "uikit/dist/css/uikit.min.css";

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

  const formatValue = (value) => {
    if (typeof value === 'number') {
      return value.toFixed(2);
    }
    return value;
  };

  const columns = useMemo(() => {
    if (loans.length === 0) return [];
    const keys = Object.keys(loans[0]).filter(key => key !== "id" && key !== "createdAt" && key !== "updatedAt");
    return keys.map(key => ({
      Header: key.replace(/_/g, " "), // Replace underscores with spaces for headers
      accessor: key,
      Cell: ({ value }) => formatValue(value) // Format cell values
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
      {loans.length > 0 ? (
          <table {...getTableProps()} className="uk-table uk-table-striped uk-table-hover uk-table-divider uk-margin-medium-bottom">
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ cursor: 'pointer' }}>
                      {column.render('Header')}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
      ) : (
        <p>No loans available.</p>
      )}
    </div>
  );
};

export default History;
