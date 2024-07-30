import React from 'react'
import UploadCSVDialog from './UploadCSVDialog'

function CSVUplaoder() {
  return (
    <div className=" w-full p-3 h-auto flex flex-col justify-center items-center overflow-hidden">
      <div className=" w-[99%] h-full space-y-2 bg-white rounded-2xl p-2 ">
        {/* heading */}
        <div className=" w-full h-16  flex justify-between items-center">
          <h3 className=" font-bold text-xl ">Upload CSV</h3>
          <div>
            <UploadCSVDialog />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CSVUplaoder
