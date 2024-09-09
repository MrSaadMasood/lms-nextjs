"use client";

import { barChartOptions } from "@/lib/variables/chartJs";
import { ChartData } from "chart.js";
import { Bar } from "react-chartjs-2";

export default function BarChart({
  chartData
}: {
  chartData: ChartData<"bar", number[], string>
}) {
  return (
    <Bar
      data={chartData}
      options={barChartOptions}
    />
  );
}
