'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useDebouncedCallback } from 'use-debounce'
import { Input } from "../ui/input"

function DebouncedInputForTestSearching({ discover }: { discover: string }) {

  const [searchInput, setSearchInput] = useState("")
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const debouncedSearchInput = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("discover", value);
    router.replace(`${pathname}?${params}`)
  }, 500)


  return (
    <Input className=" bg-violet-300 pl-9" max={100} type="text"
      onChange={e => {
        setSearchInput(e.target.value);
        debouncedSearchInput(e.target.value)
      }}
      value={searchInput || discover}
    />
  )
}

export default DebouncedInputForTestSearching 
