"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

export function RadioGroupForMCQ() {
  const [radioValue, setRadioValue] = useState({
    id: "1",
    value: "",
  });
  return (
    <RadioGroup value={radioValue.value}>
      {[
        "defaulths asdfjlk asjdfl javc., lj lkajsdflkj lkjas ljsdlk jflasfj ljdsalfa dljflj ldj nlcl kjdlskfj laj lksjd la",
        "confortable",
        "hello",
        "another",
      ].map((str, index) => (
        <div
          key={index}
          onClick={() => setRadioValue({ id: "1", value: str })}
          className="flex  flex-row justify-start  items-center h-auto w-full  space-x-2"
        >
          <div className="  w-[10%] h-full flex justify-center items-center   ">
            <RadioGroupItem value={str} id={"1"} className=" " />
          </div>
          <div className="  w-[90%] h-full">
            <Label className=" w-full h-full  " htmlFor="r1">
              {str}
            </Label>
          </div>
        </div>
      ))}
    </RadioGroup>
  );
}
