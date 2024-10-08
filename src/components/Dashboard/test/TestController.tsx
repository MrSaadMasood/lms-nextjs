'use client'
import MCQ from "@/components/Dashboard/MCQ";
import TestCompletionDialog from "@/components/Dashboard/TestCompletionDialog";
import TestTimer from "@/components/Dashboard/TestTimer";
import { useEffect, useMemo, useState } from "react";
import RefundTokensIfTestNotFound from "./RefundTokensIfTestNotFound";
import NavigateTests from "./NavigateTests";
import ShowResultsOfTest from "./ShowResultsOfTest";
import useTestController from "@/hooks/useTestController";

function TestController({
  isTestFound,
  mcqData,
  userPerformanceAverage
}: {
  isTestFound: boolean,
  mcqData: MCQ[],
  userPerformanceAverage: number
}) {
  const {
    totalMCQSTheUserWillHaveToSolve,
    seeResults,
    optionSelector,
    getMCQBasedOnCurrentMCQNumber,
    handleNextMCQButton,
    handlePreviousMCQButton,
    showResult,
    countDownTimeRemaining,
    allSelectedMCQs,
    isTestResultSubmitted,
    currentMCQNumber,
    setIsTestResultSubmitted
  } = useTestController({ isTestFound, mcqData, userPerformanceAverage })

  return (
    <>
      <h2
        className="text-4xl md:text-6xl text-white  font-bold  h-auto w-full 
      
      flex justify-center items-center mt-2  "
      >
        {showResult ? "Result" : "Quiz"}
      </h2>
      {(!showResult && isTestFound) && <TestTimer timeLeft={countDownTimeRemaining} />}
      {/* quiz */}
      <div className="w-full h-auto flex justify-center items-center">
        {!isTestFound && !showResult && <RefundTokensIfTestNotFound />}
        {isTestFound && !showResult && (
          <div className="w-[98%] h-full bg-white rounded-2xl mb-[4.5rem] md:mb-[1rem] flex flex-col 
              justify-center items-center space-y-2 p-2">
            <MCQ
              result={showResult}
              questionNumber={currentMCQNumber + 1}
              mcq={getMCQBasedOnCurrentMCQNumber()}
              mcqOptionSelected={allSelectedMCQs[currentMCQNumber]?.current_selected_option || ""}
              optionSelector={optionSelector}
            />

            <div className="w-full flex justify-between items-center space-x-4">
              <NavigateTests
                totalMCQSTheUserWillHaveToSolve={totalMCQSTheUserWillHaveToSolve}
                currentMCQNumber={currentMCQNumber}
                handlePreviousMCQButton={handlePreviousMCQButton}
                handleNextMCQButton={handleNextMCQButton}
              />
              <div>
                <TestCompletionDialog
                  setIsTestResultsSubmitted={setIsTestResultSubmitted}
                  isTestResultSubmitted={isTestResultSubmitted}
                  totalMCQS={totalMCQSTheUserWillHaveToSolve}
                  allSelectedMCQs={allSelectedMCQs}
                  seeResults={seeResults}
                />
              </div>
            </div>

          </div>
        )}

        {/* mcq result */}
        {isTestFound && showResult && (
          <ShowResultsOfTest
            showResult={showResult}
            allSelectedMCQs={allSelectedMCQs}
            optionSelector={() => { }} />
        )}
      </div>
    </>
  )
}

export default TestController 
