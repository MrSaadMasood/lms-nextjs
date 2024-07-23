import React from "react";
import { FaUsers } from "react-icons/fa";

function RealTimeDataCard({ heading, stats }: { heading: string; stats: number }) {
  return (
    <article
      className="bg-white rounded-3xl w-[90%] hover:bg-gray-200 duration-300 h-32 
          flex flex-col justify-center items-center overflow-hidden"
    >
      <header className=" h-[50%] w-full p-2 flex justify-start items-center space-x-2">
        <div className=" bg-violet-400 h-12 w-12 rounded-full flex justify-center items-center">
          <FaUsers size={25} color="black" />
        </div>
        <h2 className="  rounded-full text-sm flex justify-center items-center">{heading}</h2>
      </header>
      <div
        className=" h-[50%] w-full p-2 flex justify-start items-center
            font-bold text-xl"
      >
        {stats}
      </div>
    </article>
  );
}

export default RealTimeDataCard;
