'use client'
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react'

export const Client = ({ value }: { value: number }) => {
  const radioValues = ["Yearly", "Monthly", "Weekly"];
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  console.log("the value is", value)

  function updatePerfParam(value: string) {
    const params = new URLSearchParams(searchParams)
    params.set("time", value)
    router.replace(`${pathname}?${params.toString()}`)
  }
  return (
    <div onClick={() => {
      updatePerfParam(radioValues[Math.floor(Math.random() * 2)].toLowerCase())

    }} >
      {value}
    </div>
  )
}
