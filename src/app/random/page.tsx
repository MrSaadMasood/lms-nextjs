import { PerformanceFilter } from "@/lib/types/exported-types";
import { Client } from "./Client";

export const dynamic = "force-dynamic"
export default function Random({ searchParams }: { searchParams: { time: PerformanceFilter } }) {
  const radioValues = ["Yearly", "Monthly", "Weekly"];
  const time = radioValues[Math.floor(Math.random() * 3)].toLowerCase()
  console.log("the time is", searchParams.time)
  let value;
  if (time === "weekly") value = 5
  if (time === "yearly") value = 8
  else value = Math.random()
  return (
    <Client value={value} />
  )
}
