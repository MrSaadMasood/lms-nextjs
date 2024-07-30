'use client'
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import useToaster from '@/hooks/useToaster';
import React, { ChangeEvent, ChangeEventHandler, useRef, useState } from 'react'

function UploadCSVDialog() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [csvFile, setCsvFile] = useState<File>()
  const { errorToast } = useToaster()
  console.log("the uploaded file is", csvFile)

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.size > 1e+6) return errorToast("Max File Size Exceeded")
    if (!e.target.files) return errorToast("No File Provided")
    setCsvFile(e.target.files[0])
  }

  return (
    <Dialog>
      {/* trigget  */}
      <DialogTrigger asChild>
        <Button className="">
          Upload
        </Button>
      </DialogTrigger>
      {/* content */}
      <DialogContent className="w-[90%] h-auto duration-300 rounded-2xl">
        <DialogHeader>
          <DialogTitle>Batch Uploader</DialogTitle>
          <DialogDescription> Plaase follow the Guidelines to Upload Your MCQs in batch with ease.</DialogDescription>
        </DialogHeader>
        {/* guideline  */}
        <h3 className=' text-2xl font-bold '>Guidelines</h3>
        <ol className='  w-full bg-blue-300   h-auto text-sm list-disc '>
          <li className=''>The Excel File must have a maximum size of 50mb</li>
          <li> The Excel file should have following columns: {" "}
            <strong>
              subject,
              paper_category,
              academy_name,
              statement,
              option_a,
              option_b,
              option_c,
              correct,
              explanation,
              paper_year,
              difficulty

            </strong>
          </li>
          <li>If you dont want to add and explanation simply write
            <strong>
              <span>&quot</span>
              None
              <span>&quot</span>
            </strong> in it</li>
          <li>All coloumns are required</li>
          <li>At this time, only on correct option is supported.</li>
        </ol>
        <input
          ref={fileInputRef}
          type="file"
          accept='.csv'
          className='hidden'
          onChange={e => handleFileChange(e)}
        />
        <DialogFooter className=" ">
          <Button
            onClick={() => fileInputRef.current?.click()}>
            Choose File
          </Button>
          <Button
            onClick={() => console.log("uploaded file")}>
            Confirm Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UploadCSVDialog
