import { Button } from "@/components/ui/button";
import { ChartTypeOptions, CoinHistoricalData, GeneralChartOptions, SpecificCoinData } from "@/lib/types/exported-types";
import { lineChartOptions } from "@/lib/variables/chartJs";
import { Bar, Line } from "react-chartjs-2";
import { FaDownload } from "react-icons/fa";
import ChartControllerBar from "./ChartControllerBar";
import CoinStat from "./CoinStat";
import useCoinChart from "@/hooks/useCoinChart";

function CoinChart({
  coinId
}: {
  coinId: string
}) {

  const {
    chartTypeOptionsUpdator,
    resetChartZoom,
    downloadChart,
    chartRef,
    chartTypeOptions,
    barChartRef,
    lineChartDataForCoin,
    barChartDataForCoin
  } = useCoinChart({ coinId })

  return (
    <div
      className=" w-full md:h-auto p-2 rounded-2xl flex flex-col justify-center items-center md:items-center
      bg-white overflow-hidden space-y-3 mb-16 md:mb-0 "
    >
      {chartTypeOptions.general === "trading view" && (
        <div className=" text-xs text-red-600 ">*The real time values are simulated</div>
      )}
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
            data={lineChartDataForCoin}
          />
        ) : (
          <Bar
            id="barChart"
            ref={barChartRef}
            options={lineChartOptions as GeneralChartOptions<"bar">}
            data={barChartDataForCoin}
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
      <CoinStat coinId={coinId}
      />
    </div>
  );
}

export default CoinChart;
