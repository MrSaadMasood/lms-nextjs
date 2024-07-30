"use client";
import RealTimeRouteTable from "@/components/Dashboard/RealTimeTable/RealTimeRouteTable";
import { Combobox } from "@/components/Dashboard/admin/ComboBox";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AdminSearch() {
  const [showAllMCQS, setShowAllMCQS] = useState(false)

  return (
    <section
      className=" bg-violet-700 w-screen md:w-full md:h-full h-screen flex flex-col space-y-3
      overflow-hidden overflow-y-scroll noScroll text-black"
    >
      <h2
        className="text-4xl md:text-6xl text-white  font-bold  h-20 w-full 
        flex justify-center items-center   "
      >
        Search MCQs
      </h2>
      {/* search */}
      <section
        className=" w-full h-auto  md:h-auto bg-violet-700 mt-2  flexrow
        mb-20 md:mb-0"
      >
        {/* categories */}
        {/* search filters */}
        <div
          className=" w-[95%] h-auto flex bg-white rounded-3xl 
          flex-col  md:justify-around md:items-center p-2
          justify-start items-center space-y-4 overflow-hidden  noScroll
          "
        >
          <h2 className=" text-xl font-bold ">Select Filters</h2>
          {showAllMCQS && (
            <div>No Filters Selected</div>
          )}
          {!showAllMCQS && (
            <div className="w-full h-auto p-2   flex flex-wrap  justify-between items-center">
              {Array(4).fill(0).map((value, index) => (
                <div key={index} className=" w-[47%] lg:w-[25%] xl:w-[25%]  flex flex-col 
                    justify-center items-center mb-2 ">
                  <Combobox />
                </div>
              ))}
            </div>
          )}
          <div className=" w-full flex justify-center items-center space-x-2 ">
            <Button>Search</Button>
            <Button onClick={() => setShowAllMCQS(!showAllMCQS)}>
              {showAllMCQS ? "Show Filters" : "Show All"}
            </Button>
          </div>
        </div>

      </section>
      {/* table */}
      <div className=" w-full h-auto flex justify-center items-center ">
        {/* no serach result  */}
        {/* <div className=" w-[95%] h-[10rem] bg-white p-2 flex justify-center items-center */}
        {/*   rounded-2xl space-x-2 "> */}
        {/*   <div> */}
        {/**/}
        {/*     <FaSearch size={25} /> */}
        {/*   </div> */}
        {/*   <div> */}
        {/**/}
        {/*     No Search Results */}
        {/*   </div> */}
        {/* </div> */}

        {/* table  */}

        <div className=" w-[95%] h-auto bg-white p-2 flex justify-center items-center
          rounded-2xl space-x-2 mb-20 md:mb-2">
          <RealTimeRouteTable
            showCoinChart={(id, value) => console.log(id, value)}
            showDeleteButton={true}
          />
        </div>
      </div>
    </section>
  );
}
