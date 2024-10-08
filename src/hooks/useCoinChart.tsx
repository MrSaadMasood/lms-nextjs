import { coinHistoricalDataFetcher } from "@/fetchRequests/fetch";
import { ChartTypeOptions, CoinHistoricalData } from "@/lib/types/exported-types";
import { coinHistoricalDataSchema } from "@/lib/zodSchema";
import { Chart, ChartData } from "chart.js";
import { useEffect, useMemo, useRef, useState } from "react";

function useCoinChart({
  coinId
}: {
  coinId: string,

}) {

  const chartRef = useRef<Chart<"line", number[], string>>(null);
  const barChartRef = useRef<Chart<"bar", number[], string>>(null);
  const [chartTypeOptions, setChartTypeOptions] = useState<ChartTypeOptions>({
    general: "price",
    shape: "line",
    timeline: "1m",
  });
  const [coinData, setCoinData] = useState<CoinHistoricalData>({
    prices: [],
    market_caps: []
  })
  const [coinPriceExtremes, setCoinPriceExtremes] = useState({
    minExtreme: 0,
    maxExtreme: 0
  })

  const memoCoinPriceExtremes = useMemo(() => coinPriceExtremes, [coinPriceExtremes])

  useEffect(() => {
    const timeline = chartTypeOptions.timeline;
    let days = Number(timeline[0])
    if (timeline.includes("m")) {
      days *= 30
    }
    coinHistoricalDataFetcher(coinId, days)
      .then(res => res.json())
      .then(data => {

        const parsedCoinData = coinHistoricalDataSchema.parse(data)
        const mappedPrices = parsedCoinData.prices.map(priceArray => priceArray[1])

        setCoinPriceExtremes({
          minExtreme: Math.min(...mappedPrices),
          maxExtreme: Math.max(...mappedPrices)
        })
        setCoinData(parsedCoinData)

      })
      .catch(error => console.log("error occured while getting the coin data", error))

  }, [chartTypeOptions.timeline, coinId])

  useEffect(() => {
    if (chartTypeOptions.general !== "trading view") return

    const realTimeChartSimulator = setInterval(() => {
      setCoinData((prevCoinData: CoinHistoricalData) => {
        const { minExtreme, maxExtreme } = memoCoinPriceExtremes
        const randomValue = Math.floor(Math.random() * (maxExtreme - minExtreme) + minExtreme)
        return {
          ...prevCoinData,
          prices: [...prevCoinData.prices, [Date.now(), randomValue]]
        }
      })
    }, 3000)
    return () => clearInterval(realTimeChartSimulator)

  }, [chartTypeOptions.general, memoCoinPriceExtremes])

  const isMarketCapSelected = chartTypeOptions.general === "market cap"
  const coinDataToAccess = isMarketCapSelected ? "market_caps" : "prices"

  const barChartDataForCoin: ChartData<"bar", any, string> = {
    labels: coinData.prices.map((data: number[]) =>
      new Date(data[0]).toLocaleString("default", {
        day: "2-digit",
        month: "short",
      }),
    ),
    datasets: [
      {
        label: chartTypeOptions.general,
        data: coinData[coinDataToAccess].map((data: number[]) => data[1]),
        borderColor: "rgb(109, 40, 217)",
        backgroundColor: "rgb(192, 132, 252)",
      },
    ],
  }

  const lineChartDataForCoin: ChartData<"line", any, string> = {
    labels: coinData.prices.map((data: number[]) =>
      new Date(data[0]).toLocaleString("default", {
        day: "2-digit",
        month: "short",
      }),
    ),
    datasets: [
      {
        label: chartTypeOptions.general,
        data: coinData[coinDataToAccess].map((data: number[]) => data[1]),
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
  }

  function chartTypeOptionsUpdator(prop: string, value: string) {
    setChartTypeOptions((pre) => ({
      ...pre,
      [prop]: value,
    }));
  }

  function downloadChart() {
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


  return {
    resetChartZoom,
    downloadChart,
    chartTypeOptionsUpdator,
    chartTypeOptions,
    barChartDataForCoin,
    lineChartDataForCoin,
    chartRef,
    barChartRef,
  }
}

export default useCoinChart
