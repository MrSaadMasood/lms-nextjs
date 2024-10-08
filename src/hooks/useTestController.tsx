import { useState, useEffect, useMemo } from "react"
import { adjustDifficulty, handleMCQArrayExhaustion, initialTestDifficultySetter, isCorrectOptionSelectedForMCQ, selectMCQBasedOnAdjustedDifficulty } from "@/lib/utils/clientHelpers";
import { COUNT_DOWN_INTIAL_VALUE, MCQ_LIMIT_FOR_PERSOLIZED_ALGO_ACTIVATION } from "@/lib/variables/constants";

function useTestController({ isTestFound, mcqData, userPerformanceAverage }: {
  isTestFound: boolean,
  mcqData: MCQ[],
  userPerformanceAverage: number
}) {

  const [currentMCQNumber, setCurrentMCQ] = useState(-1)
  const [currentDifficulty, setCurrentDifficulty] = useState<number>(initialTestDifficultySetter(userPerformanceAverage))
  const [allSelectedMCQs, setAllSelectedMCQs] = useState<MCQExtendedForUserSelection[]>([])
  const [wasPrevAnsCorrect, setWasPrevAnsCorrect] = useState(false)
  const [countDownTimeRemaining, setCountDownTimeRemaining] = useState(COUNT_DOWN_INTIAL_VALUE)
  const [shouldStartCoundDownAgain, setShouldStartCoundDownAgain] = useState(true)
  const [showResult, setShowResult] = useState(false)
  const [isTestResultSubmitted, setIsTestResultSubmitted] = useState(false)

  const easyMCQs = useMemo(() =>
    mcqData.filter(mcq => mcq.difficulty === "EASY"),
    [mcqData])
  const mediumMCQs = useMemo(() =>
    mcqData.filter(mcq => mcq.difficulty === "MEDIUM"),
    [mcqData]
  )
  const hardMCQs = useMemo(() =>
    mcqData.filter(mcq => mcq.difficulty === "HARD"),
    [mcqData])
  const [currentMCQUsedBasedOnDifficultyLookupNumber, setCurrentMCQUsedBasedOnDifficultyLookupNumber] = useState({
    "EASY": -1,
    "MEDIUM": -1,
    "HARD": -1
  })

  const totalMCQs = mcqData.length
  const totalMCQSTheUserWillHaveToSolve = totalMCQs >= MCQ_LIMIT_FOR_PERSOLIZED_ALGO_ACTIVATION
    ? Math.floor(totalMCQs / 3) : totalMCQs

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCountDownTimeRemaining((countDownTimeRemaining) => {
        if (countDownTimeRemaining === 0) {
          return 0
        }
        else {
          return countDownTimeRemaining - 1
        }
      })
    }, 1000)

    return () => clearInterval(timeInterval)
  }, [shouldStartCoundDownAgain])

  function handleNextMCQButton() {
    if (!allSelectedMCQs[currentMCQNumber + 1]) {
      personalizedMCQGenerator(countDownTimeRemaining > 0, wasPrevAnsCorrect);
      setCountDownTimeRemaining(COUNT_DOWN_INTIAL_VALUE)
      setShouldStartCoundDownAgain(true)
    }
    setCurrentMCQ(currentMCQNumber + 1);
  }


  function optionSelector({ mcq, valueSelected }: OptionSelector) {
    setAllSelectedMCQs((allSelectedMCQs): MCQExtendedForUserSelection[] => {
      const isCurrentMCQBeingChangedFound = allSelectedMCQs.findIndex((mcqSelected) =>
        mcqSelected.id === mcq.id
      )

      if (isCurrentMCQBeingChangedFound < 0) {
        allSelectedMCQs.push({ ...mcq, current_selected_option: valueSelected })
      }
      else {
        allSelectedMCQs[isCurrentMCQBeingChangedFound].current_selected_option = valueSelected
      }
      return allSelectedMCQs
    })
    setWasPrevAnsCorrect(isCorrectOptionSelectedForMCQ(mcq, valueSelected))
  }

  function seeResults() {
    setShowResult(true)
  }



  function updateStatesForMCQGenerator(difficultyNumber: number, difficultyToUse: TestDifficulty, lookupNumber: number) {

    setCurrentMCQUsedBasedOnDifficultyLookupNumber((currentMCQUsedBasedOnDifficultyLookupNumber) => ({
      ...currentMCQUsedBasedOnDifficultyLookupNumber,
      [difficultyToUse]: lookupNumber
    }))
    setCurrentDifficulty(difficultyNumber)
    setCurrentMCQ(currentMCQNumber + 1)
  }

  function personalizedMCQGenerator(solvedWithinTime: boolean, wasPrevAnsCorrect: boolean) {

    let personalizedMCQ: MCQ;
    let adjustedDifficulty = currentDifficulty
    if (totalMCQs >= MCQ_LIMIT_FOR_PERSOLIZED_ALGO_ACTIVATION) {
      adjustedDifficulty = adjustDifficulty(solvedWithinTime, wasPrevAnsCorrect, currentDifficulty)
    }

    const mcqToUseRecord = {
      EASY: easyMCQs,
      MEDIUM: mediumMCQs,
      HARD: hardMCQs
    }

    adjustedDifficulty = handleMCQArrayExhaustion(mcqToUseRecord, currentMCQUsedBasedOnDifficultyLookupNumber, adjustedDifficulty)
    const availableDifficulty: TestDifficulty[] = ["EASY", "MEDIUM", "HARD"]
    const difficultyToUse = availableDifficulty[adjustedDifficulty]
    const lookUpNumberForMCQAdjusted = currentMCQUsedBasedOnDifficultyLookupNumber[difficultyToUse] + 1

    updateStatesForMCQGenerator(adjustedDifficulty, difficultyToUse, lookUpNumberForMCQAdjusted)
    personalizedMCQ = selectMCQBasedOnAdjustedDifficulty(difficultyToUse, mcqToUseRecord, lookUpNumberForMCQAdjusted)

    allSelectedMCQs.push({ ...personalizedMCQ, current_selected_option: "NONE" })
    return personalizedMCQ

  }

  function getMCQBasedOnCurrentMCQNumber() {
    if (currentMCQNumber < 0) {
      return personalizedMCQGenerator(true, true)
    }
    return allSelectedMCQs[currentMCQNumber]

  }

  function handlePreviousMCQButton() {
    setCountDownTimeRemaining(0)
    setShouldStartCoundDownAgain(false)
    setCurrentMCQ(currentMCQNumber - 1)
  }

  return {
    handlePreviousMCQButton,
    handleNextMCQButton,
    getMCQBasedOnCurrentMCQNumber,
    optionSelector,
    seeResults,
    totalMCQSTheUserWillHaveToSolve,
    showResult,
    countDownTimeRemaining,
    currentMCQNumber,
    allSelectedMCQs,
    setIsTestResultSubmitted,
    isTestResultSubmitted,
  }

}

export default useTestController
