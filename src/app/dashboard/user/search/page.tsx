import SearchPage from "@/components/Dashboard/SearchPage";
import { getTestSearchCategoryBasedInfo } from "@/SQLqueries/userQueries";

export default async function UserSearch({ searchParams }: {
  searchParams: {
    category: TestSearchCategory
  }
}) {
  const category = searchParams.category
  let categoryData: CategoryData[] = [
    { category: "academy", id: "1234324", name: 'random' }
  ]
  try {

    categoryData = (await getTestSearchCategoryBasedInfo(category))
  } catch (error) {
    console.log("The error is now in the search page", error)
  }
  console.log("The category data is", categoryData)
  return (
    <SearchPage
      categoryData={categoryData}
      category={category}
    />
  );
}
