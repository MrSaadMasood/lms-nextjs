import TestController from "@/components/Dashboard/test/TestController";
import { auth } from "@/lib/authJs/auth";
import { userExtractor } from "@/lib/utils/serverHelpers";
import { averageUserPerformanceQuery, testBasedOnFilters } from "@/SQLqueries/userQueries";
import { headers } from "next/headers";

export default async function UserTest({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | null;
    category: TestSearchCategory;
    filter: TestFilterByOptions
  };
}) {

  const referer = headers().get("referer")
  const { academy, subject, exam, year, category, filter, academy_id } = searchParams;
  const session = await auth()
  const user = userExtractor(session)
  let testBasedOnFiltersArray = (await testBasedOnFilters({
    academy, subject, exam, year, category, filter, academy_id
  })).rows as MCQ[];
  let userPerformanceAverage = 0
  try {
    userPerformanceAverage = (await averageUserPerformanceQuery(user.id)).rows[0].performance
  } catch (error) {
    console.log("The user Performance averge failed")
  }

  const isTestFound = testBasedOnFiltersArray.length > 0

  if (!referer || !referer.includes("/user/search")) {
    return (
      <section
        className=" bg-violet-700 w-screen md:w-full md:h-full md:max-h-auto h-screen max-h-auto text-white
    overflow-hidden overflow-y-scroll noScroll flex flex-col justify-center items-center "
      >
        <h2
          className="text-xl sm:text-xl md:text-2xl lg:text-4xl  text-white  font-bold  h-full w-full 
    flex justify-center items-center mt-2 break-all  "
        >
          Your Are Accessing Through Incorrect Path
        </h2>
      </section>
    )
  }
  return (
    <section
      className=" bg-violet-700 w-screen md:w-full md:h-full md:max-h-auto h-screen max-h-auto text-white
      overflow-hidden overflow-y-scroll noScroll  "
    >
      {/* timer */}
      <TestController
        mcqData={testBasedOnFiltersArray}
        isTestFound={isTestFound}
        userPerformanceAverage={userPerformanceAverage}
      />

    </section>
  );
}
