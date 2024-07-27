"use client";
import UserQuizSearchGeneralCategories from "@/components/Dashboard/UserQuizSearchGeneralCategories";
import UserTestSelectedDialogue from "@/components/Dashboard/UserTestSelectedDialogue";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function UserSearch() {
  const [selectedCategory, setSelectedCategory] = useState(0);

  function changeSelectedCategory(value: number) {
    setSelectedCategory(value);
  }
  return (
    <section
      className=" bg-violet-700 w-screen md:w-full md:h-full h-screen
      overflow-hidden overflow-y-scroll noScroll text-black"
    >
      <h2
        className="text-4xl md:text-6xl text-white  font-bold  h-20 w-full 
        flex justify-center items-center mt-2  "
      >
        Discover
      </h2>
      {/* input */}
      <div className="  w-full h-16 flex justify-center items-center">
        <div className="relative ">
          <Input className=" bg-violet-300 pl-9" max={100} type="text" />
          <div className="absolute top-1/2 left-2 translateY ">
            <FaSearch size={20} />
          </div>
        </div>
      </div>
      {/* search */}
      <section
        className=" w-full h-[75%]  md:h-[75%] bg-violet-700 mt-2  flexrow
        mb-20 md:mb-0"
      >
        {/* categories */}
        <div
          className=" w-[95%] h-full flex bg-white rounded-3xl 
          flex-col  md:justify-around md:items-center
          justify-start items-center space-y-4 overflow-hidden  noScroll
          "
        >
          <UserQuizSearchGeneralCategories
            changeSelectedCategory={changeSelectedCategory}
            selectedCategory={selectedCategory}
          />
          <ul
            className=" w-full h-full p-2 md:flex md:flex-wrap md:justify-between items-center
            overflow-hidden overflow-y-scroll noScroll space-y-2 "
          >
            {Array(20)
              .fill("Academy")
              .map((value, index) => {
                return (
                  <UserTestSelectedDialogue
                    key={index}
                    title={value}
                    selectedCategory={selectedCategory}
                    optionSelected={value}
                  />
                );
              })}
          </ul>
        </div>
      </section>
    </section>
  );
}
