import { Button } from '@/components/ui/button'
import React from 'react'

function NavigateTests({
  handleNextMCQButton,
  handlePreviousMCQButton,
  currentMCQNumber,
  totalMCQSTheUserWillHaveToSolve
}: {
  handlePreviousMCQButton: () => void,
  currentMCQNumber: number,
  totalMCQSTheUserWillHaveToSolve: number,
  handleNextMCQButton: () => void
}) {
  return (
    <div className="w-full flex justify-start items-center space-x-4">
      <Button
        onClick={handlePreviousMCQButton}
        disabled={currentMCQNumber === 0}
      >
        Previous
      </Button>
      <Button>{currentMCQNumber + 1} of {totalMCQSTheUserWillHaveToSolve}</Button>
      <Button
        onClick={handleNextMCQButton}
        disabled={currentMCQNumber === totalMCQSTheUserWillHaveToSolve - 1}
      >
        Next
      </Button>
    </div>
  )
}

export default NavigateTests  
