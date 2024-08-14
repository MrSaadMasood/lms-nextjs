import RealTimeDataCardDisplayer from "@/components/Dashboard/RealTimeDataCardDisplayer";
import { UserInfoHeader } from "@/components/Dashboard/UserInfoHeader";
import UserSubscriptionCallToAction from "@/components/Dashboard/UserSubscriptionCallToAction";
import { auth } from "@/lib/authJs/auth";
import { PerformanceFilter, RealTimeCardInitialData } from "@/lib/types/exported-types";
import { userExtractor } from "@/lib/utils/helpers";
import { realTimeCardInitialDataQuery } from "@/SQLqueries/userQueries";
import UserDashboardCharts from "../../../../components/Dashboard/UserDashboardCharts";
import { db } from "@/lib/drizzle";
import { LmsUserStatsTable } from "@/lib/drizzle/schema";
import { userStatData } from "@/lib/drizzle/seedData";

export const dynamic = "force-dynamic";

export default async function UserHome({ searchParams }:
  {
    searchParams:
    { performance: PerformanceFilter }
  }) {
  const { performance } = searchParams
  const session = await auth();
  const user = userExtractor(session);
  const realTimeCardInitialData =
    (await realTimeCardInitialDataQuery(user.id, performance)).rows[0] as RealTimeCardInitialData<number>

  return (
    <section className="bg-violet-700 w-screen md:w-full md:h-full h-screen  
      overflow-hidden overflow-y-scroll noScroll">
      <UserInfoHeader user={user} />
      <RealTimeDataCardDisplayer liveData={realTimeCardInitialData} />
      <UserSubscriptionCallToAction user={user} />
      <UserDashboardCharts
        performance={realTimeCardInitialData.performance || 0}
        user={user}
      />
    </section>
  );
}
