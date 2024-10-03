import SearchPage from "@/components/Dashboard/SearchPage";
import { getTestSearchCategoryBasedInfo } from "@/SQLqueries/userQueries";

export default async function UserSearch({ searchParams }: {
  searchParams: {
    category: TestSearchCategory,
    discover: string | null
  }
}) {
  const { category, discover } = searchParams
  const categoryData = (await getTestSearchCategoryBasedInfo(category, discover || ""))
  return (
    <SearchPage
      categoryData={categoryData}
      category={category}
      discover={discover || ""}
    />
  );
}
