'use client'

import { IoMoon } from "react-icons/io5"
import { MdSunny } from "react-icons/md"

function GreetingsWithTimer() {
  const hour = new Date().getHours()

  function greeter() {
    if (hour >= 0 && hour < 12) return "Good Morning"
    else if (hour >= 12 && hour < 18) return "Good Afternoon"
    return "Google Evening"
  }

  return (
    <>
      <div>
        {(hour >= 4 && hour < 18) && <MdSunny size={20} color="yellow" />}
        {(hour >= 18 || hour < 4) && <IoMoon size={20} color="white" />}
      </div>
      <div className="text-sm">{greeter()}</div>
    </>
  )
}

export default GreetingsWithTimer
