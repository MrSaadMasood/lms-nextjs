'use client'
import { signOut } from "next-auth/react"
import { usePathname } from "next/navigation"
export default function LogoutButton({ css }: { css?: string }) {
  const style = css || `w-[20rem] p-2 flex justify-center items-center
      rounded-lg bg-white border-2 border-violet-400 cursor-pointer`
  const pathname = usePathname()
  if (pathname === "/signup") return null
  return (
    <button className={style} onClick={() =>
      signOut()}>
      Log Out
    </button>
  )
}
