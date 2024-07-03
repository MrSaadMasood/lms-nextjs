'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function SignUpCallLink({ isAdminPage }: { isAdminPage: boolean }) {
  const pathname = usePathname()
  if (pathname !== "/login") return null

  return (
    <div className="text-xs">{isAdminPage ? "Become an Admin" : "Dont have an account?"} <span className="text-violet-700 font-bold">
      <Link href={`/signup?admin=${isAdminPage}`}>Sign Up</Link>
    </span>
    </div >
  )
}

export default SignUpCallLink
