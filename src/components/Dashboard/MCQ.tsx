import clsx from "clsx";
import { RadioGroupForMCQ } from "./RadioGroupForMCQ";
import { v4 as uuid } from "uuid";
import { isCorrectOptionSelectedForMCQ } from "@/lib/utils/clientHelpers";

function MCQ({ result, mcq, questionNumber, mcqOptionSelected, optionSelector }: {
  result: boolean,
  mcq: MCQ,
  questionNumber: number,
  mcqOptionSelected: string,
  optionSelector: (options: OptionSelector) => void
}) {

  const options: Option[] = [
    { value: mcq.option_a, correct: "A" },
    { value: mcq.option_b, correct: "B" },
    { value: mcq.option_c, correct: "C" },
    { value: mcq.option_d, correct: "D" }
  ]

  return (
    <div
      className="  text-black w-full h-full rounded-2xl p-2 
          flex flex-col justify-start items-start bg-white border border-black
          space-y-4 "
    >
      <div className=" 
        font-bold w-full h-auto flex justify-center items-center text-2xl md:text-4xl ">
        Question {questionNumber}</div>
      <div className=" w-full flex justify-center items-center text-lg md:text-xl h-auto break-all ">
        {mcq.statement}
      </div>
      <div><span className=" font-bold ">Difficulty:</span> {mcq.difficulty}</div>

      {!result && <RadioGroupForMCQ
        mcqOptionSelected={mcqOptionSelected}
        optionSelector={optionSelector}
        options={options}
        mcq={mcq}
      />}
      {result && options.map((option, index) => {
        const isCorrectOptionSelected = isCorrectOptionSelectedForMCQ(mcq, option.value)
        return (
          <div key={index}
            className={clsx(`flex  flex-row justify-start  
              items-center h-auto w-full  space-x-2 break-all
              p-2 rounded-xl`, isCorrectOptionSelected && " bg-black text-white border-2 border-black "
              , !isCorrectOptionSelected && option.value === mcq.current_selected_option && "bg-red-600 text-white ")}>
            {option.value}
          </div>
        )
      })}
      {result && mcq.explanation !== "NONE" && (
        <>
          <div className="font-bold text-xl">Explanation:</div>
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-[90%] h-auto rounded-xl break-all">
              {mcq.explanation}
            </div>
          </div>
        </>

      )}
    </div>
  );
}

export default MCQ;
