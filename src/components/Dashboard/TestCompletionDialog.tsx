'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import TestResultTable from "./TestResultTable"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useRef } from "react"

export default function TestCompletionDialog() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const dialogTriggerButton = useRef<HTMLButtonElement>(null)

  function routeToShowTestExplanation() {
    console.log("the result is")
    const params = new URLSearchParams(searchParams)
    params.set("result", "true")
    router.replace(`${pathname}?${params.toString()}`)
    dialogTriggerButton.current?.click()

  }
  return (
    <Dialog>
      {/* trigget  */}
      <DialogTrigger asChild>
        <Button ref={dialogTriggerButton}
          className=""
        >Finish Test</Button>
      </DialogTrigger>
      {/* content */}
      <DialogContent className="w-[90%] h-auto duration-300 rounded-2xl">
        <DialogHeader>
          <DialogTitle>Test Results</DialogTitle>
          <DialogDescription>Here are your test results</DialogDescription>
        </DialogHeader>
        <TestResultTable />
        <DialogFooter className=" ">
          <Button
          >Home
          </Button>
          <Button onClick={routeToShowTestExplanation}
          >View Explanations
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}
