import Link from "next/link";
import MCQ from "../MCQ";

function ShowResultsOfTest({ optionSelector, allSelectedMCQs, showResult }: {
  allSelectedMCQs: MCQExtendedForUserSelection[],
  showResult: boolean,
  optionSelector: () => void
}) {
  return (
    <>
      <div className="w-[98%] h-full bg-white rounded-2xl mb-[4.5rem] md:mb-[1rem] flex flex-col 
              justify-center items-center space-y-2 p-2">
        <ul className="w-full h-auto p-2 text-black space-y-2 ">
          {allSelectedMCQs.map((mcq, index) => {
            return (
              <MCQ
                result={showResult}
                mcq={mcq}
                mcqOptionSelected=""
                optionSelector={optionSelector}
                questionNumber={index + 1}
                key={index}
              />
            );
          })}
        </ul>
        <Link
          href="/dashboard/user/search?category=academy"
          replace={true}
          className="bg-black text-white text-sm p-2 rounded-md"
        >
          Go Home
        </Link>
      </div>
    </>
  )
}

export default ShowResultsOfTest  
