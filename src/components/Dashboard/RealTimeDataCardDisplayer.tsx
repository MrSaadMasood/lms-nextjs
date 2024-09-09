'use client'
import { useState } from 'react'
import RealTimeDataCard from './RealTimeDataCard'
import { CardInitialData, RealTimeCardInitialData } from '@/lib/types/exported-types'


function RealTimeDataCardDisplayer(
  { liveData }: {
    liveData: RealTimeCardInitialData<number>
  }
) {
  const [cardsData, setCardsData] = useState<CardInitialData<number | string>>({
    total_mcq_bank: liveData.total_mcq_bank || "N/A",
    total_users: liveData.total_users || "N/A",
    total_mcq_solved: liveData.total_mcq_bank || "N/A",
    activeUsers: 0
  })

  return (
    <div
      className="h-[18rem] md:h-[10rem]  w-full mt-3 p-1 grid grid-cols-2 md:grid-cols-4 md:grid-rows-1 
        gap-y-8  grid-rows-2 place-items-center "
    >
      {Object.entries(cardsData).map((entry, index) => (
        <RealTimeDataCard key={index} heading={entry[0]} stats={entry[1]} />
      ))}
    </div>
  )
}

export default RealTimeDataCardDisplayer
