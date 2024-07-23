"use client";

import { ArcElement, BarElement, Chart as ChartJS, Filler, Legend, Title, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(BarElement, Title, Tooltip, Legend, Filler, ArcElement);

export default function BarChart() {
  const options = {
    scales: {
      x: {
        grid: {
          drawOnChartArea: false,
          drawTicks: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          drawTicks: false,
          color: "gray",
          tickBorderDash: [1, 2],
        },
        border: {
          display: false,
          dash: [12, 12],
          dashOffset: 40,
        },

        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <Bar
      data={{
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
          {
            label: "Study Hours",
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: "#6d28d9",
            hoverBackgroundColor: "#4c1d95",
            borderRadius: 15,
            barThickness: "flex",
            borderSkipped: false,
          },
        ],
      }}
      options={options}
    />
  );
}
