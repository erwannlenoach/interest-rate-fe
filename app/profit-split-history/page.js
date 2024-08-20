"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import "uikit/dist/css/uikit.min.css";
import withAuth from "@/app/hoc/withAuth";
import axios from "axios";
import UIkit from "uikit";
import { useAuth } from "../context/AuthContext";
import NoDataAvailable from "../components/no-data/page";
import CustomButton from "../components/history-bottom/page";
import PageTitle from "../components/page-title/page";
import moment from "moment";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { profitSplitExplanations } from "@/app/utils/constants";

const ProfitSplitHistory = () => {
  const { user } = useAuth();
  const [profitSplits, setProfitSplits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch profit splits", error);
        setLoading(false);
      }
    };

    fetchProfitSplits();
  }, [user]);

  const handleDownloadReport = (row) => {
    const hqProfit = ((1 - row.profit_allocation_key) * 100).toFixed(2);
    const subsProfit = (row.profit_allocation_key * 100).toFixed(2);

    const report = {
      "Headquarters Revenue": `$${(row.hq_revenue / 1000).toLocaleString()}K (${
        profitSplitExplanations.hq_revenue
      })`,
      "Headquarters Cost": `$${(row.hq_cost / 1000).toLocaleString()}K (${
        profitSplitExplanations.hq_cost
      })`,
      "Headquarters Assets": `$${(row.hq_assets / 1000).toLocaleString()}K (${
        profitSplitExplanations.hq_assets
      })`,
      "Headquarters Liabilities": `$${(
        row.hq_liabilities / 1000
      ).toLocaleString()}K (${profitSplitExplanations.hq_liabilities})`,
      "Subsidiary Revenue": `$${(row.subs_revenue / 1000).toLocaleString()}K (${
        profitSplitExplanations.subs_revenue
      })`,
      "Subsidiary Cost": `$${(row.subs_cost / 1000).toLocaleString()}K (${
        profitSplitExplanations.subs_cost
      })`,
      "Subsidiary Assets": `$${(row.subs_assets / 1000).toLocaleString()}K (${
        profitSplitExplanations.subs_assets
      })`,
      "Subsidiary Liabilities": `$${(
        row.subs_liabilities / 1000
      ).toLocaleString()}K (${profitSplitExplanations.subs_liabilities})`,
      "Headquarters Industry": `${row.hq_industry} (${profitSplitExplanations.industry})`,
      "Subsidiary Industry": `${row.subs_industry} (${profitSplitExplanations.industry})`,
      "Headquarters Function": `${row.hq_function} (${profitSplitExplanations.function})`,
      "Subsidiary Function": `${row.subs_function} (${profitSplitExplanations.function})`,
      "Predicted Profit Split (HQ)": `${hqProfit}%`,
      "Predicted Profit Split (Subsidiary)": `${subsProfit}%`,
    };

    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Profit Split Report", 20, 20);

    doc.setFontSize(12);
    doc.text(
      "This report provides a detailed analysis of the factors influencing the predicted profit split.",
      20,
      30
    );

    doc.autoTable({
      startY: 40,
      head: [["Factor", "Value"]],
      body: Object.entries(report).map(([key, value]) => [key, value]),
      styles: { halign: "left" },
      margin: { top: 10, left: 20, right: 20 },
    });

    doc.text(
      "The profit split prediction was generated using a machine learning model trained on sample data. " +
        "This model aims to provide an arm's length profit allocation comparable to market standards, " +
        "but as the app is currently in beta, the results may not represent a 100% reliable arm's length allocation.",
      20,
      doc.autoTable.previous.finalY + 20
    );

    doc.save(`ProfitSplitReport_${row.id}.pdf`);
  };

  const handleDeleteProfitSplit = async (profitSplitId) => {
    UIkit.modal
      .confirm("Are you sure you want to delete this profit split?")
      .then(
        async function () {
          try {
            const token = sessionStorage.getItem("token");
            await axios.delete(
              `${process.env.NEXT_PUBLIC_API_URL}/api/profit-split/${profitSplitId}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            setProfitSplits(
              profitSplits.filter((split) => split.id !== profitSplitId)
            );
            UIkit.notification({
              message: "Profit Split deleted successfully!",
              status: "success",
            });
          } catch (error) {
            console.error("Failed to delete profit split", error);
            UIkit.notification({
              message: "Failed to delete profit split!",
              status: "danger",
            });
          }
        },
        function () {
          UIkit.notification({
            message: "Profit Split deletion canceled!",
            status: "warning",
          });
        }
      );
  };

  const columns = useMemo(() => {
    if (!profitSplits || profitSplits.length === 0) return [];

    return [
      {
        Header: "Index",
        accessor: (row, index) => index + 1,
        disableSortBy: true,
      },
      {
        Header: "HQ Profit Allocation (%)",
        accessor: "hq_profit_allocation",
        Cell: ({ row }) => {
          const hqProfitAllocation =
            (1 - row.original.profit_allocation_key) * 100;
          return `${hqProfitAllocation.toFixed(1)}%`;
        },
      },
      {
        Header: "Subsidiary Profit Allocation (%)",
        accessor: "subsidiary_profit_allocation",
        Cell: ({ row }) => {
          const subsProfitAllocation = row.original.profit_allocation_key * 100;
          return `${subsProfitAllocation.toFixed(1)}%`;
        },
      },

      ...Object.keys(profitSplits[0])
        .filter(
          (key) =>
            key !== "id" &&
            key !== "createdAt" &&
            key !== "updatedAt" &&
            key !== "UserId" &&
            key !== "profit_allocation_key"
        )
        .map((key) => ({
          Header: key.replace(/_/g, " "),
          accessor: key,
          Cell: ({ value }) => value,
        })),
      {
        Header: "Created At",
        accessor: "createdAt",
        Cell: ({ value }) => moment(value).format("DD-MM-YYYY HH:mm:ss"),
      },
      {
        Header: "Updated At",
        accessor: "updatedAt",
        Cell: ({ value }) => moment(value).format("DD-MM-YYYY HH:mm:ss"),
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              uk-icon="icon: download; ratio: 1.5"
              style={{ cursor: "pointer", color: "blue", marginRight: "10px" }}
              onClick={() => handleDownloadReport(row.original)}
            />
            <span
              uk-icon="icon: trash; ratio: 1.5"
              style={{ cursor: "pointer", color: "red" }}
              onClick={() => handleDeleteProfitSplit(row.original.id)}
            />
          </div>
        ),
      },
    ];
  }, [profitSplits]);

  const data = useMemo(() => profitSplits, [profitSplits]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  const downloadCSV = () => {
    const csvData = profitSplits.map((row, index) =>
      [
        index + 1,
        ((1 - row.profit_allocation_key) * 100).toFixed(1) + "%",
        (row.profit_allocation_key * 100).toFixed(1) + "%",
        ...columns
          .filter(
            (col) =>
              col.accessor !== "actions" &&
              col.accessor !== "hq_profit_allocation" &&
              col.accessor !== "subsidiary_profit_allocation" &&
              col.accessor !== "createdAt" &&
              col.accessor !== "updatedAt"
          )
          .map((col) => row[col.accessor]),
        ,
        moment(row.createdAt).format("DD-MM-YYYY HH:mm:ss"),
        moment(row.updatedAt).format("DD-MM-YYYY HH:mm:ss"),
      ].join(",")
    );

    const csvHeader = [
      "Index",
      "HQ Profit Allocation (%)",
      "Subsidiary Profit Allocation (%)",
      ...columns
        .filter(
          (col) =>
            col.accessor !== "actions" &&
            col.accessor !== "hq_profit_allocation" &&
            col.accessor !== "subsidiary_profit_allocation" &&
            col.accessor !== "createdAt" &&
            col.accessor !== "updatedAt"
        )
        .map((col) => col.Header),
      ,
      "Created At",
      "Updated At",
    ].join(",");

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
    <div className="uk-container  uk-padding-medium table uk-margin-large">
      <PageTitle title="PROFIT SPLIT HISTORY" />
      {loading ? (
        <div className="uk-text-center uk-margin-large-top">
          <div uk-spinner="ratio: 3"></div>
          <p>Loading data...</p>
        </div>
      ) : profitSplits?.length > 0 ? (
        <>
          <div className="uk-overflow-auto">
            <table
              {...getTableProps()}
              className="uk-table uk-table-striped uk-table-hover uk-table-divider uk-margin-large-bottom"
              style={{ minWidth: "1000px" }}
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        style={{ cursor: "pointer", minWidth: "150px" }}
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
              href="/profit-split"
              icon="laptop"
              label="New Simulation"
              variant="primary"
            />
          </div>
        </>
      ) : (
        <NoDataAvailable
          message="profit split"
          buttonText="New Simulation"
          buttonUrl="/profit-split"
        />
      )}
    </div>
  );
};

export default withAuth(ProfitSplitHistory);
