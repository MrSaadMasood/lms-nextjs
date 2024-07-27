"use client";

import { clsx } from "clsx";

function UserQuizSearchGeneralCategories({
  selectedCategory,
  changeSelectedCategory,
}: {
  selectedCategory: number;
  changeSelectedCategory: (value: number) => void;
}) {
  const searchCategories = ["Academy", "Exam", "Subject"];
  return (
    <ul className="w-full h-16  flex justify-between items-center p-2 ">
      {searchCategories.map((category, index) => {
        const isSelected = selectedCategory === index;
        return (
          <li
            key={index}
            onClick={() => changeSelectedCategory(index)}
            className="w-[33%] h-full cursor-pointer 
            flex flex-col justify-start items-center mt-3 md:mt-5"
          >
            <div
              className={clsx(
                isSelected && "font-bold text-base md:text-xl text-violet-700",
                !isSelected && " text-gray-500 text-sm md:text-base ",
              )}
            >
              {category}
            </div>
            {isSelected && <span className="  text-violet-700 text-xl">&#x2022;</span>}
          </li>
        );
      })}
    </ul>
  );
}

export default UserQuizSearchGeneralCategories;
