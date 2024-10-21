import SearchPage from "@/components/Dashboard/SearchPage";
import { auth } from "@/lib/authJs/auth";
import { userExtractor } from "@/lib/utils/serverHelpers";
import { getTestSearchCategoryBasedInfo } from "@/SQLqueries/userQueries";

export default async function UserSearch({ searchParams }: {
  searchParams: {
    category: TestSearchCategory,
    discover: string | null
  }
}) {
  const { category, discover } = searchParams
  const [session, categoryData] = await Promise.all([
    auth(),
    getTestSearchCategoryBasedInfo(category, discover || "")
  ])
  const user = userExtractor(session)
  return (
    <SearchPage
      user={user}
      categoryData={categoryData}
      category={category}
      discover={discover || ""}
    />
  );
}
