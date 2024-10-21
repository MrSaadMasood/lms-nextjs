'use client'
import { FaSearch } from "react-icons/fa";
import DebouncedInputForTestSearching from "./DebouncedInputForTestSearching";
import { TestSearchCategoriesAndSelectionFilters } from "./TestSearchCategoriesAndSelectionFilters";

function SearchPage({ categoryData, category, discover, user }: {
  categoryData: CategoryData[],
  category: TestSearchCategory,
  user: UserRole,
  discover: string
}) {
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
          <DebouncedInputForTestSearching discover={discover} />
          <div className="absolute top-1/2 left-2 translateY ">
            <FaSearch size={20} />
          </div>
        </div>
      </div>
      {/* search */}
      <section
        className=" w-full h-[75%]  md:h-[75%] bg-violet-700  flexrow
        mb-20 md:mb-0"
      >
        {/* categories */}
        <TestSearchCategoriesAndSelectionFilters
          user={user}
          categoryData={categoryData}
          category={category}
        />
      </section>
    </section>

  )
}

export default SearchPage
