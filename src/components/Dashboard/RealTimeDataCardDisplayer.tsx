import React from 'react'
import RealTimeDataCard from './RealTimeDataCard'

function RealTimeDataCardDisplayer(
  { liveData }: {
    liveData: { heading: string, stats: number }[]
  }
) {
  return (
    <div
      className="h-[18rem] md:h-[10rem]  w-full mt-3 p-1 grid grid-cols-2 md:grid-cols-4 md:grid-rows-1 
        gap-y-8  grid-rows-2 place-items-center "
    >
      {liveData.map((item, index) => (
        <RealTimeDataCard key={index} heading={item.heading} stats={item.stats} />
      ))}
    </div>
  )
}

export default RealTimeDataCardDisplayer
