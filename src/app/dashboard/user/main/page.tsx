import { realTimeCardInitialDataQuery } from "@/SQLqueries/userQueries";
import RealTimeDataCardDisplayer from "@/components/Dashboard/RealTimeDataCardDisplayer";
import { UserInfoHeader } from "@/components/Dashboard/UserInfoHeader";
import UserSubscriptionCallToAction from "@/components/Dashboard/UserSubscriptionCallToAction";
import { auth } from "@/lib/authJs/auth";
import { PerformanceFilter, RealTimeCardInitialData } from "@/lib/types/exported-types";
import { userExtractor } from "@/lib/utils/serverHelpers";
import UserDashboardCharts from "../../../../components/Dashboard/UserDashboardCharts";


export default async function UserHome({ searchParams }:
  {
    searchParams:
    { performance: PerformanceFilter }
  }) {
  const { performance } = searchParams
  const session = await auth();
  const user = userExtractor(session);

  let realTimeCardInitialData =
    (await realTimeCardInitialDataQuery(user.id, performance)).rows[0] as RealTimeCardInitialData<number>

  user.subscription_type = realTimeCardInitialData.subscription_type;
  user.free_tokens = realTimeCardInitialData.free_tokens


  return (
    <section className="bg-violet-700 w-screen md:w-full md:h-full h-screen  
      overflow-hidden overflow-y-scroll noScroll">
      <UserInfoHeader user={user} />
      {/* <RealTimeDataCardDisplayer liveData={realTimeCardInitialData} /> */}
      <UserSubscriptionCallToAction user={user} />
      <UserDashboardCharts
        performance={realTimeCardInitialData.performance || 0}
        user={user}
      />
    </section>
  );
}
