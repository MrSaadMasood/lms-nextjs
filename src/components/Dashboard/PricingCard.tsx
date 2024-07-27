import { Button } from "@/components/ui/button";
import { FaArrowAltCircleRight } from "react-icons/fa";
export default function PricingCard({
  heading,
  price,
  desc,
  list,
  callToAction,
}: {
  heading: string;
  price: string;
  desc: string;
  callToAction: string;
  list: string[];
}) {
  return (
    <section
      className=" h-[80%] w-[97%] md:w-[40%] bg-white rounded-3xl  overflow-hidden
      hover:cursor-pointer  hover:shadow-2xl  duration-300  "
    >
      <header
        className="w-full h-[12%] flex justify-between  items-center font-bold text-xl p-2 
              bg-white mt-2 "
      >
        <h2>{heading}</h2>
        <div className="text-3xl font-bold">{price}</div>
      </header>
      <div
        className="w-full h-[25%]  text-center 
              flexrow text-sm"
      >
        <div className="w-[80%] h-full flexrow">{desc}</div>
      </div>
      <div className=" w-full h-[11%]  flexrow">
        <Button className="bs-violet-700">{callToAction}</Button>
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
