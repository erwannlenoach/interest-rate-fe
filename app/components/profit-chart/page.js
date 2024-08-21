"use client";

import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const ProfitChart = ({ hqProfit, subsProfit }) => {
  const data = {
    labels: ["HQ Profit", "Sub Profit"],
    datasets: [
      {
        label: "Profit Distribution",
        data: [hqProfit, subsProfit],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    aspectRatio: 2.5, 
    plugins: {
      legend: {
        position: "bottom",
      },
      datalabels: {
        color: '#fff', // Label text color
        font: {
          size: 14, // Label font size
          weight: 'bold', // Label font weight
        },
        formatter: (value, context) => {
          const label = context.chart.data.labels[context.dataIndex];
          return `${label}: ${value}%`; // Label text to display
        },
        anchor: 'center',
        align: 'center',
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default ProfitChart;
