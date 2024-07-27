"use client";
import RealTimeRouteTable from "@/components/Dashboard/RealTimeTable/RealTimeRouteTable";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const CoinChart = dynamic(() => import("@/components/Dashboard/RealTimeTable/CoinChart"), {
  loading: () => <p>loading</p>,
  ssr: false,
});

export default function RealTimeVisualization() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();

  function showCoinChart(id: string, value: string) {
    if (!id.includes("first_name")) return;
    params.set("coin", value);
    router.push(`${pathname}?${params}`);
  }

  return (
    <section
      className="bg-violet-700 w-screen md:w-full md:h-full h-screen
      overflow-hidden overflow-y-scroll noScroll text-black"
    >
      <h2
        className="text-2xl md:text-6xl text-white  font-bold  h-20 w-full 
        flex justify-center items-center mt-2  "
      >
        Crypto Data Visualization
      </h2>
      <div className=" w-full p-3 h-auto flex flex-col justify-center items-center overflow-hidden">
        {!params.has("coin") ? <RealTimeRouteTable showCoinChart={showCoinChart} /> : <CoinChart />}
      </div>
    </section>
  );
}
