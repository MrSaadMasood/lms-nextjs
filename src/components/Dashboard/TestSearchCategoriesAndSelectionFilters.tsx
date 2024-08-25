'use client'
import UserQuizSearchGeneralCategories from './UserQuizSearchGeneralCategories'
import { v4 as uuid } from 'uuid'
import UserTestSelectedDialogue from './UserTestSelectedDialogue'
import { useCallback, useState } from 'react'

export const TestSearchCategoriesAndSelectionFilters = ({ categoryData, category }:
  {
    categoryData: CategoryData[],
    category: TestSearchCategory
  }) => {


  function titleGenerator(data: CategoryData) {
    if (!data.category) return ""
    switch (data.category) {
      case "exam":
        return data.paper_category
      case "subject":
        return data.subject
      case "academy":
        return data.name
    }
  }

  return (
    <div
      className=" w-[95%] h-full flex bg-white rounded-3xl 
          flex-col  md:justify-start md:items-center
          justify-start items-center space-y-4 overflow-hidden  noScroll
          "
    >
      <UserQuizSearchGeneralCategories />
      <ul
        className=" w-full h-auto p-2 grid sm:grid-cols-2 md:grid-cols-3 justify-items-center 
              overflow-hidden overflow-y-scroll noScroll space-y-1  "
      >
        {categoryData.map((data, index) => {
          data.category = category
          return (
            <UserTestSelectedDialogue
              key={uuid()}
              // selectedOption={selectedOption}
              academyId={data.category === "academy" ? data.id : ""}
              title={titleGenerator(data)}
              category={category}
            // changeValue={changeValue}
            />
          );
        })}
      </ul>
    </div>
  )
}