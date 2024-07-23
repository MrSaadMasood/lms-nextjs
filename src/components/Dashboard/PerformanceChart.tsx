"use client";
import {
  ArcElement,
  Chart as ChartJS,
  Filler,
  Legend,
  Title,
  Tooltip,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartTemplate from "./ChartTemplate";
import { PerformanceChartDropdown } from "./PerformanceChartDropDown";

ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend, Filler, ArcElement);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  maintainAspectRatio: false,
};
const data = {
  labels: ["Performance"],
  datasets: [
    {
      label: "Performance",
      data: [3, 6],
      circumference: 180,
      rotation: 270,
      backgroundColor: ["#6d28d9", "black"],
    },
  ],
};

function PerformanceChart() {
  return (
    <ChartTemplate heading="Performance">
      <section className="bg-white w-[95%] border-2 border-gray-700 h-[90%] p-2 overflow-hidden rounded-3xl flex flex-col  justify-center items-center">
        <PerformanceChartHeader />
        <div className="w-full h-[85%]">
          <Doughnut
            plugins={[
              {
                id: "gaugeInnerText",
                beforeDraw(chart) {
                  const { ctx } = chart;
                  ctx.save();
                  const xCoordinates = chart.getDatasetMeta(0).data[0].x;
                  const yCoordindates = chart.getDatasetMeta(0).data[0].y;
                  ctx.fillStyle = "black";
                  ctx.font = "bold 2rem sans-serif";
                  ctx.textAlign = "center";
                  ctx.fillText("22", xCoordinates, yCoordindates);
                },
              },
            ]}
            options={options}
            data={data}
          />
        </div>
      </section>
    </ChartTemplate>
  );
}

function PerformanceChartHeader() {
  return (
    <header className="w-[95%] h-[15%]  flex">
      <div className="  w-[50%] h-full flex justify-start items-center space-x-2">
        <div className="w-5 h-5 bg-green-700 rounded-md"></div>
        <h4 className=" text-sm">Point Progres</h4>
      </div>
      <div className="  w-[50%] h-full flex justify-end items-center">
        <PerformanceChartDropdown />
      </div>
    </header>
  );
}
export default PerformanceChart;
