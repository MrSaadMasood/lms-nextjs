import ChartTemplate from "@/components/Dashboard/ChartTemplate";
import TakeTestCall from "@/components/Dashboard/TakeTestCall";
import { accuracyChartDataGenerator, overallStatsChartDataGenerator, perSubjectDifficultyChartDataGenerator, weeklyActivityChartDataGenerator } from "@/lib/utils/helpers";
import { userDashboardBarChartPersonalizedData } from "@/SQLqueries/userQueries";
import { ChartData } from "chart.js";
import { clsx } from "clsx";
import { randomUUID } from "crypto";
import dynamic from 'next/dynamic';

const BarChart = dynamic(() => import("@/components/Dashboard/BarChart"), { ssr: false })
const PerformanceChart = dynamic(() => import("@/components/Dashboard/PerformanceChart"), { ssr: false })

export default async function UserDashboardCharts({ performance, user }: {
  performance: number,
  user: UserRole
}) {
  const [overallStats, accuracy, weeklyActivity, perSubjectDifficultyStats] =
    await userDashboardBarChartPersonalizedData(user.id)
  const userDashboardPersonalData = [
    { heading: "Overall Stats", chartData: overallStatsChartDataGenerator(overallStats) },
    { heading: "Accuray", chartData: accuracyChartDataGenerator(accuracy.rows as AccuracyStats[]) },
    { heading: "Weekly Activity", chartData: weeklyActivityChartDataGenerator(weeklyActivity.rows as WeeklyActivity[]) },
    {
      heading: "Per Subject Difficulty",
      chartData: perSubjectDifficultyChartDataGenerator(perSubjectDifficultyStats)
    }
  ]

  return (
    <>
      <div className=" md:flex md:flex-row">
        <TakeTestCall />
        <PerformanceChart performance={performance} />
      </div>
      <div className=" md:flex md:flex-row md:flex-wrap">
        {userDashboardPersonalData.map((userDashboardData, index) => (
          <ChartTemplate
            key={randomUUID()}
            heading={userDashboardData.heading}
            margin={clsx("h-[28rem]", index === 3 && "mb-20 md:mb-8")}
          >
            <section
              className="bg-white w-[95%] h-[90%] p-2 overflow-hidden rounded-3xl flex flex-col
                justify-center items-center"
            >
              <BarChart chartData={userDashboardData.chartData} />
            </section>
          </ChartTemplate>
        ))}
      </div>
    </>
  )
}
