import { Session } from "next-auth";

type SessionProp = {
  session: Session;
};


type ChartTypeOptions = {
  general: "price" | "market cap" | "trading view",
  shape: "line" | "bar",
  timeline: "1d" | "7d" | "1m" | "3m"
}

type GeneralChartOptions<Type extends "bar" | "line"> = ChartOptions<Type>
