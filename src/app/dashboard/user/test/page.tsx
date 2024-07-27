import MCQ from "@/components/Dashboard/MCQ";
import TestCompletionDialog from "@/components/Dashboard/TestCompletionDialog";
import TestTimer from "@/components/Dashboard/TestTimer";
import Link from "next/link";

export default function UserTest({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | null;
  };
}) {
  const { academy, subject, exam, year, result } = searchParams;
  return (
    <section
      className=" bg-violet-700 w-screen md:w-full md:h-full h-screen text-white
      overflow-hidden overflow-y-scroll noScroll  "
    >
      <h2
        className="text-4xl md:text-6xl text-white  font-bold  h-20 w-full 
      
      flex justify-center items-center mt-2  "
      >
        {result ? "Result" : "Quiz"}
      </h2>
      {/* timer */}

      {!result && <TestTimer />}
      {/* quiz */}

      <div
        className=" w-full h-auto bg-white rounded-2xl mb-[4.5rem] md:mb-[1rem]
        flex flex-col justify-start items-center space-y-2 p-2 "
      >
        {Array(10)
          .fill(0)
          .map((item, index) => (
            <MCQ key={index} result={result} />
          ))}
        {!result && <TestCompletionDialog />}
        {result && (
          <Link
            href={"/dashboard/user/main"}
            replace={true}
            className=" bg-black text-white text-sm p-2 rounded-md"
          >
            Go Home
          </Link>
        )}
      </div>
    </section>
  );
}
