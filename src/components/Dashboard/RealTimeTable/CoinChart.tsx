import COIN_DATA from "@/../COIN_DATA.json";

import { Button } from "@/components/ui/button";
import { ChartTypeOptions, GeneralChartOptions } from "@/lib/types/exported-types";
import { lineChartOptions } from "@/lib/variables/chartJs";
import { Chart } from "chart.js";
import { useRef, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { FaDownload } from "react-icons/fa";
import ChartControllerBar from "./ChartControllerBar";

function CoinChart() {
  const chartRef = useRef<Chart<"line", number[], string>>(null);
  const barChartRef = useRef<Chart<"bar", number[], string>>(null);
  const [chartTypeOptions, setChartTypeOptions] = useState<ChartTypeOptions>({
    general: "price",
    shape: "line",
    timeline: "1m",
  });

  function chartTypeOptionsUpdator(prop: string, value: string) {
    setChartTypeOptions((pre) => ({
      ...pre,
      [prop]: value,
    }));
  }

  async function downloadChart() {
    let chartToDownload = chartTypeOptions.shape === "line" ? chartRef : barChartRef;
    if (!chartToDownload.current) return;

    // image download
    const link = document.createElement("a");
    link.href = chartToDownload.current.toBase64Image("image/png", 1);
    link.download = "chart.png";
    link.click();
  }

  function resetChartZoom(value: "bar" | "line") {
    if (value === "line") {
      if (!chartRef.current) return;
      return chartRef.current.resetZoom();
    }

    if (!barChartRef.current) return;
    return barChartRef.current.resetZoom();
  }
  return (
    <div
      className=" w-full md:h-auto p-2 rounded-2xl flex flex-col justify-center items-center md:items-center
      bg-white overflow-hidden space-y-3 mb-16 md:mb-0 "
    >
      {/* chart options  */}
      <ChartControllerBar
        chartTypeOptionsUpdator={chartTypeOptionsUpdator}
        chartTypeOptions={chartTypeOptions}
      />
      {/* chart  */}
      <div className=" w-full h-[30rem] flex flex-col justify-center items-center ">
        {chartTypeOptions.shape === "line" ? (
          <Line
            ref={chartRef}
            id="lineChart"
            options={lineChartOptions}
            data={{
              labels: COIN_DATA.prices.map((data) =>
                new Date(data[0]).toLocaleString("default", {
                  day: "2-digit",
                  month: "short",
                }),
              ),
              datasets: [
                {
                  label: "Price",
                  data: COIN_DATA.prices.map((data) => data[1]),
                  borderColor: "rgb(126 34 206)",
                  backgroundColor: (context) => {
                    if (!context.chart.chartArea) return;
                    const {
                      chartArea: { top, bottom },
                      ctx,
                    } = context.chart;
                    const gradientBackground = ctx.createLinearGradient(0, top, 0, bottom);
                    gradientBackground.addColorStop(0, "rgb(192 132 252)");
                    gradientBackground.addColorStop(1, "white");
                    return gradientBackground;
                  },
                  fill: true,
                  tension: 0.1,
                  pointRadius: 0,
                },
              ],
            }}
          />
        ) : (
          <Bar
            id="barChart"
            ref={barChartRef}
            options={lineChartOptions as GeneralChartOptions<"bar">}
            data={{
              labels: COIN_DATA.prices.map((data) =>
                new Date(data[0]).toLocaleString("default", {
                  day: "2-digit",
                  month: "short",
                }),
              ),
              datasets: [
                {
                  label: "Price",
                  data: COIN_DATA.prices.map((data) => data[1]),
                  borderColor: "rgb(109, 40, 217)",
                  backgroundColor: "rgb(192, 132, 252)",
                },
              ],
            }}
          />
        )}
      </div>

      {/* chart function button  */}
      <div className=" w-full flex justify-start items-center space-x-2 ">
        <Button onClick={() => resetChartZoom(chartTypeOptions.shape)}>Reset Zoom</Button>
        <Button onClick={downloadChart}>
          <FaDownload />
        </Button>
      </div>

      {/* coin information  */}
      <div className=" w-full h-auto flex flex-col justify-start items-center space-y-2   ">
        <div className=" w-full h-auto ">
          <h2 className=" text-2xl font-bold ">Coin Statistics</h2>
        </div>
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className=" w-full p-2 text-sm md:text-base border-t-2 border-gray-100 flex justify-between items-center "
            >
              <div className=" text-gray-600 ">Market Cap</div>
              <div className=" font-bold ">$ 3000000000</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CoinChart;
