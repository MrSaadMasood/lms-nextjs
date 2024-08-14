import { Session } from "next-auth";

type SessionProp = {
  session: Session;
};

type ChartTypeOptions = {
  general: "price" | "market cap" | "trading view";
  shape: "line" | "bar";
  timeline: "1d" | "7d" | "1m" | "3m";
};

type GeneralChartOptions<Type extends "bar" | "line"> = ChartOptions<Type>;

type RealTimeCardInitialData<T> = {
  total_users: T,
  total_mcq_bank: T,
  total_mcq_solved: T,
  performance?: T
}

type CardInitialData<T> = RealTimeCardInitialData<T> & { activeUsers: T }

type PerformanceFilter = "weekly" | "monthly" | "yearly"
