import BarChart from "@/components/Dashboard/BarChart";
import CallToActionButton from "@/components/Dashboard/CallToActionButton";
import ChartTemplate from "@/components/Dashboard/ChartTemplate";
import PerformanceChart from "@/components/Dashboard/PerformanceChart";
import RealTimeDataCard from "@/components/Dashboard/RealTimeDataCard";
import RealTimeDataCardDisplayer from "@/components/Dashboard/RealTimeDataCardDisplayer";
import TakeTestCall from "@/components/Dashboard/TakeTestCall";
import { UserInfoHeader } from "@/components/Dashboard/UserInfoHeader";
import { auth } from "@/lib/authJs/auth";
import { userExtractor } from "@/lib/utils/helpers";
import { liveData } from "@/lib/variables/constants";
import { clsx } from "clsx";

export default async function UserHome() {
  const session = await auth();
  const user = userExtractor(session);
  return (
    <section className="bg-violet-700 w-screen md:w-full md:h-full h-screen  overflow-hidden overflow-y-scroll noScroll">
      <UserInfoHeader />
      <RealTimeDataCardDisplayer liveData={liveData} />
      {user && user.subscription_type !== "PERM" && (
        <section className="h-52 md:h-40 w-full flex justify-center items-center mt-3 md:mt-0">
          <div
            className=" bg-white w-[95%] md:w-[98%] h-full rounded-3xl p-2 flex flex-col justify-center
            items-center space-y-3"
          >
            <h3 className=" text-2xl md:text-3xl font-bold">Get Unlimited Access</h3>
            <div className="  w-[70%] text-center">
              <span className="font-bold ">{user.name}! </span>
              Buy Our <strong>One-Time Subscription</strong> and Enjoy Unlimited Access
            </div>
            <CallToActionButton content="Pricing" link="/dashboard/user/pricing" />
          </div>
        </section>
      )}
      <div className=" md:flex md:flex-row">
        <TakeTestCall />
        <PerformanceChart />
      </div>
      <div className=" md:flex md:flex-row md:flex-wrap">
        {[1, 2, 3, 4].map((item, index) => (
          <ChartTemplate
            key={index}
            heading="Hours Spent"
            margin={clsx("h-[28rem]", index === 3 && "mb-20 md:mb-8")}
          >
            <section
              className="bg-white w-[95%] h-[90%] p-2 overflow-hidden rounded-3xl flex flex-col
            justify-center items-center"
            >
              <BarChart />
            </section>
          </ChartTemplate>
        ))}
      </div>
    </section>
  );
}
