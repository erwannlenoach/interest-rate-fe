import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProfitChart = ({ hqProfit, subsProfit }) => {
  const data = {
    labels: ["HQ Profit", "Subsidiary Profit"],
    datasets: [
      {
        label: "Profit Distribution",
        data: [hqProfit, subsProfit],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
        borderWidth: 1,
        aspectRatio: 1
      },
    ],
  };

  return <Pie data={data}  options={{
    responsive: true,
    aspectRatio: 2.5, 
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  }} />;
};

export default ProfitChart;
