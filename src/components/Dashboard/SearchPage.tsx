
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { TestSearchCategoriesAndSelectionFilters } from "./TestSearchCategoriesAndSelectionFilters";

function SearchPage({ categoryData, category }: {
  categoryData: CategoryData[],
  category: TestSearchCategory
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
          <Input className=" bg-violet-300 pl-9" max={100} type="text" />
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
          categoryData={categoryData}
          category={category}
        />
      </section>
    </section>

  )
}

export default SearchPage
