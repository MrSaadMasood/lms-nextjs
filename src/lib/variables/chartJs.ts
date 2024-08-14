import COIN_DATA from "@/../COIN_DATA.json";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  Plugin,
  PointElement,
  Title,
  Tooltip,
  TooltipItem,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

const customCanvasBackgroundColor: Plugin = {
  id: "customCanvasBackgroundColor",
  beforeDraw: (chart, args, options) => {
    const { ctx, width, height } = chart;
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = options.color || "white";
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  },
};

const verticalHoverLine: Plugin = {
  id: "verticalHoverLine",
  beforeDatasetDraw: (chart) => {
    const {
      ctx,
      chartArea: { top, bottom },
    } = chart;
    ctx.save();
    chart.getDatasetMeta(0).data.forEach((dataPoint) => {
      if (dataPoint.active) {
        ctx.beginPath();
        ctx.strokeStyle = "gray";
        ctx.moveTo(dataPoint.x, top);
        ctx.lineTo(dataPoint.x, bottom);
        ctx.stroke();
      }
    });
  },
};

ChartJS.register(
  BarElement,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  zoomPlugin,
  verticalHoverLine,
  customCanvasBackgroundColor,
);

export const lineChartOptions: ChartOptions<"line"> = {
  interaction: { intersect: false, mode: "index" as "index" },
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
        color: "rgba(194, 194, 194, .4)",
      },
      border: {
        display: false,
        dashOffset: 40,
      },
    },
  },
  maintainAspectRatio: false,
  devicePixelRatio: 4,
  plugins: {
    zoom: {
      pan: {
        enabled: true,
        mode: "xy" as "xy",
      },
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
      },
    },
    legend: {
      display: false,
    },
    verticalHoverLine: true,
    tooltip: {
      callbacks: {
        title(tooltipItems: TooltipItem<"line">[]) {
          const dataIndex = tooltipItems[0].dataIndex as number;
          return new Date(COIN_DATA.prices[dataIndex][0]).toUTCString();
        },
        label(tooltipItem: TooltipItem<"line">) {
          const dataIndex = tooltipItem.dataIndex as number;
          return "Price: $" + COIN_DATA.prices[dataIndex][1].toFixed(4);
        },
      },
    },
  },
};

export const barChartOptions: ChartOptions<"bar"> = {
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