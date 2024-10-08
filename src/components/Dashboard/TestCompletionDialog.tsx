import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import TestResultTable from "./TestResultTable";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { isCorrectOptionSelectedForMCQ, seggregateResultsBasedOnSubjects } from "@/lib/utils/clientHelpers";
import { recordTestResults } from "@/fetchRequests/fetch";
import useToaster from "@/hooks/useToaster";

export default function TestCompletionDialog({
  totalMCQS,
  allSelectedMCQs,
  seeResults,
  isTestResultSubmitted,
  setIsTestResultsSubmitted
}: {
  totalMCQS: number,
  allSelectedMCQs: MCQExtendedForUserSelection[]
  seeResults: () => void,
  isTestResultSubmitted: boolean,
  setIsTestResultsSubmitted: Dispatch<SetStateAction<boolean>>
}) {

  const dialogTriggerButton = useRef<HTMLButtonElement>(null);
  const { errorToast, normalToast } = useToaster()
  const [testResult, setTestResult] = useState({
    totalWrong: 0,
    totalCorrect: 0,
    totalSolved: 0,
  })

  async function handleTestSubmission() {
    if (isTestResultSubmitted) return
    const totalCorrect = allSelectedMCQs.filter(mcq =>
      isCorrectOptionSelectedForMCQ(mcq, mcq.current_selected_option)).length
    const totalSolved = allSelectedMCQs.length

    const testResults = {
      totalCorrect,
      totalSolved,
      totalWrong: totalSolved - totalCorrect,
    }

    const subjectSeggregatedResults = seggregateResultsBasedOnSubjects(allSelectedMCQs)
    setTestResult(() => testResults)
    const response = await recordTestResults(subjectSeggregatedResults)
    const body = await response.json()
    if (!response.ok) return errorToast(body)
    normalToast(body)
    setIsTestResultsSubmitted(true)
  }

  return (
    <Dialog>
      {/* trigget  */}
      <DialogTrigger asChild>
        <Button
          onClick={handleTestSubmission}
          ref={dialogTriggerButton} className="">
          Finish Test
        </Button>
      </DialogTrigger>
      {/* content */}
      <DialogContent className="w-[90%] h-auto duration-300 rounded-2xl">
        <DialogHeader>
          <DialogTitle>Test Results</DialogTitle>
          <DialogDescription>Here are your test results</DialogDescription>
        </DialogHeader>
        <TestResultTable
          totalSolved={testResult.totalSolved}
          totalMCQS={totalMCQS}
          totalCorrect={testResult.totalCorrect}
          totalWrong={testResult.totalWrong}
        />
        <DialogFooter className=" ">
          <Button>Home</Button>
          <Button onClick={seeResults}>View Explanations</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
