"use client";
import { Doughnut } from "react-chartjs-2";
import ChartTemplate from "./ChartTemplate";
import { PerformanceChartDropdown } from "./PerformanceChartDropDown";
import { doughnutChartOptions, doughnutChartplugins } from "@/lib/variables/chartJs";
import { Chart, ChartData, Plugin } from "chart.js";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";




function PerformanceChart({ performance }: { performance: number }) {

  const data: ChartData<"doughnut", number[], string> = useMemo(() => ({
    labels: ["Performance", "Lacking Performance"],
    datasets: [
      {
        label: "Performance",
        data: [performance, 100 - performance],
        circumference: 180,
        rotation: 270,
        backgroundColor: ['#6d28d9', "black"],
        hoverBackgroundColor: ["#4c1d95", "black"]
      },
    ],
  }), [performance])

  return (
    <ChartTemplate heading="Performance">
      <section className="bg-white w-[95%] border-2 border-gray-700 h-[90%] p-2 overflow-hidden rounded-3xl flex flex-col  justify-center items-center">
        <PerformanceChartHeader />
        <div className="w-full h-[85%]">
          <Doughnut
            plugins={doughnutChartplugins}
            options={doughnutChartOptions}
            data={data}
          />
        </div>
      </section>
    </ChartTemplate>
  );
}

function PerformanceChartHeader() {
  return (
    <header className="w-[95%] h-[15%]  flex  ">
      <div className="  w-[50%] h-full flex justify-start items-center space-x-2">
        <div className="w-5 h-5 bg-violet-700 rounded-md"></div>
        <h4 className=" text-sm">Point Progres</h4>
      </div>
      <div className="  w-[50%] h-full flex justify-end items-center">
        <PerformanceChartDropdown />
      </div>
    </header>
  );
}
export default PerformanceChart;
