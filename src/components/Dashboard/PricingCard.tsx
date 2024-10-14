'use client'
import { Button } from "@/components/ui/button";
import useToaster from "@/hooks/useToaster";
import { usePathname, useRouter } from "next/navigation";
import { FaArrowAltCircleRight } from "react-icons/fa";
export default function PricingCard({
  heading,
  price,
  desc,
  list,
  callToAction,
}: {
  heading: string;
  price: number;
  desc: string;
  callToAction: string;
  list: string[];
}) {
  const { errorToast } = useToaster()
  const pathname = usePathname()
  const router = useRouter()
  async function makeStripePayment() {
    try {
      if (!pathname.includes("dashboard")) return router.replace("/login")
      const response = await fetch("/api/user/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          heading,
          price,
          desc,
        })
      })
      if (!response.ok) throw new Error(response.statusText)
      const data = await response.json()
      window.location.assign(data.url)
    } catch (error) {
      console.log('some error occured while doing the strip checkout', error)
      if (error instanceof Error) {
        return errorToast(error.message)
      }
      errorToast("Internal Server Error")
    }
  }
  return (
    <section
      className=" h-[80%] w-[97%] md:w-[48%] lg:w-[45%] bg-white rounded-3xl  overflow-hidden
      hover:cursor-pointer  hover:shadow-2xl  duration-300  "
    >
      <header
        className="w-full h-[12%] flex justify-between  items-center font-bold text-xl p-4 md:p-3 lg:p-6
              bg-white mt-2 "
      >
        <h2>{heading}</h2>
        <div className="text-3xl font-bold">{price}</div>
      </header>
      <div
        className="w-full h-[25%]  text-center 
              flexrow text-sm"
      >
        <div className="w-[80%] h-full flexrow lg:text-base ">{desc}</div>
      </div>
      <div className=" w-full h-[11%]  flexrow">
        <Button onClick={makeStripePayment} className="  ">{callToAction}</Button>
      </div>
      <ul className=" w-full h-full  p-2 flex flex-col justify-start items-center space-y-2">
        {list.map((explanation, index) => (
          <li key={index} className="w-full  flex  justify-start items-center space-x-3">
            <div className="w-[20%] flex justify-end items-center">
              <FaArrowAltCircleRight />
            </div>
            <div className="w-[80%] flex justify-start items-center">{explanation}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
