import ChartTemplate from "@/components/Dashboard/ChartTemplate";
import RealTimeDataCardDisplayer from "@/components/Dashboard/RealTimeDataCardDisplayer";
import CSVUplaoder from "@/components/Dashboard/admin/CSVUplaoder";
import { clsx } from 'clsx';
import dynamic from "next/dynamic";

const BarChart = dynamic(
  () =>
    import("@/components/Dashboard/BarChart"), { ssr: false })

export default function AdminMainPage() {
  return (
    <section
      className="bg-violet-700 w-screen md:w-full md:h-full h-screen
      overflow-hidden overflow-y-scroll noScroll text-black"
    >
      <h2
        className="text-2xl md:text-6xl text-white  font-bold  h-20 w-full 
        flex justify-center items-center mt-2  "
      >
        Admin Dashboard
      </h2>
      <CSVUplaoder />
      {/* real time data */}
      <RealTimeDataCardDisplayer liveData={{ total_users: 1, subscription_type: "PERM", free_tokens: 1, performance: 1, total_mcq_bank: 1, total_mcq_solved: 1 }} />
      {/* charts  */}
      <div className="  md:flex md:flex-row md:flex-wrap ">
        {[1, 2].map((item, index) => (
          <ChartTemplate
            key={index}
            heading="question per subject/ academy"
            margin={clsx("h-[28rem]", index === 1 && "mb-20 md:mb-8")}
          >
            <section
              className="bg-white w-[95%] h-[90%] p-2 overflow-hidden rounded-3xl flex flex-col
            justify-center items-center"
            >
              <BarChart chartData={{ labels: ["hello"], datasets: [{ data: [1, 2, 34, 5] }] }} />
            </section>
          </ChartTemplate>
        ))}
      </div>

    </section>

  )
}
