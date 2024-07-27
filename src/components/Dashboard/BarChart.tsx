"use client";

import { barChartOptions } from "@/lib/variables/chartJs";
import { Bar } from "react-chartjs-2";

export default function BarChart() {
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
      options={barChartOptions}
    />
  );
}
