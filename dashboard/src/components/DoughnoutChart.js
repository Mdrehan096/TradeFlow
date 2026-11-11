import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        boxWidth: 12,
        font: {
          size: 11,
        },
      },
    },
  },
};

export function DoughnutChart({ data }) {
  return (
    <div className="chart-wrapper chart-wrapper-doughnut">
      <Doughnut data={data} options={options} />
    </div>
  );
}
