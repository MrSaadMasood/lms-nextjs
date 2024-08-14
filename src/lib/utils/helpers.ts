
import { Session } from "next-auth";
import { PerformanceFilter } from "../types/exported-types";
import { ChartData } from "chart.js";

export function navbarLinkGenerator(role: Roles, toAdd: string) {
  return `/dashboard/${role.toLowerCase()}${toAdd}`;
}

export function userExtractor(session: Session | null) {
  if (!session || session.user.role === "ADMIN") throw new Error("Autentication Error");
  return session.user;
}
export function adminExtractor(session: Session | null) {
  if (!session || session.user.role === "USER") throw new Error("Autentication Error");
  return session.user;
}

export function getPreviousDate(performance: PerformanceFilter, date: Date) {
  switch (performance) {
    case "monthly":
      return date.setDate(date.getDate() - 30)
    case "yearly":
      return date.setDate(date.getDate() - 365)
    default:
      return date.setDate(date.getDate() - 7)

  }
}

function barChartDatasetGenerator<T extends string>(
  label: T,
  data: number[],
  backgroundColor = "#6d28d9",
  hoverBackgroundColor = "#4c1d95",

) {
  return {
    label,
    data,
    backgroundColor,
    hoverBackgroundColor,
    borderRadius: 15,
    barThickness: "flex" as const,
    borderSkipped: false,
  }
}
export function overallStatsChartDataGenerator(overallStats: OverStats[]): ChartData<"bar", number[], string> {
  return {
    labels: overallStats.map(stat =>
      stat.subject),
    datasets: [
      barChartDatasetGenerator(
        "Total Solved",
        overallStats.map(stat =>
          stat.total_solved)),
      barChartDatasetGenerator(
        "Total Correct",
        overallStats.map(stat => stat.total_correct),
        "#94d928",
        "#76ae20"
      ),
      barChartDatasetGenerator(
        "Total Incorrect",
        overallStats.map(stat => stat.total_incorrect),
        "#d9283b",
        "#ae202f"
      )
    ]
  }
}

export function accuracyChartDataGenerator(accuracyStats: AccuracyStats[]): ChartData<"bar", number[], string> {
  return {
    labels: accuracyStats.map(stat => new Date(stat.interval).toLocaleString("default", {
      day: "2-digit",
      month: "short"
    })),
    datasets: [
      barChartDatasetGenerator(
        "Accuracy Percentage",
        accuracyStats.map(stat => stat.accuracy)
      )
    ]
  }
}

export function weeklyActivityChartDataGenerator(weeklyActivityStats: WeeklyActivity[]): ChartData<"bar", number[], string> {
  return {
    labels: weeklyActivityStats.map(stat => new Date(stat.week_interval).toLocaleString("default", {
      day: "2-digit",
      month: "short"
    })),
    datasets: [
      barChartDatasetGenerator("Total Solved",
        weeklyActivityStats.map(stat => stat.total_solved))
    ]
  }

}


export function perSubjectDifficultyChartDataGenerator(
  perSubjectDifficultyStats: PerSubjectDifficultyStat[]): ChartData<"bar", number[], string> {
  return {
    labels: perSubjectDifficultyStats.map(stat => stat.subject),
    datasets: [
      barChartDatasetGenerator(
        "Total Easy",
        perSubjectDifficultyStats.map(stat =>
          stat.total_easy)),
      barChartDatasetGenerator(
        "Total Medium",
        perSubjectDifficultyStats.map(stat => stat.total_medium),
        "#94d928",
        "#76ae20"
      ),
      barChartDatasetGenerator(
        "Total Hard",
        perSubjectDifficultyStats.map(stat => stat.total_hard),
        "#d9283b",
        "#ae202f"
      )
    ]
  }
}
