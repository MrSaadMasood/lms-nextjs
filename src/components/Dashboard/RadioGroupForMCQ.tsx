import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function RadioGroupForMCQ({ options, mcqOptionSelected, optionSelector, mcq }: {
  options: Option[],
  mcqOptionSelected: string,
  optionSelector: (args: OptionSelector) => void,
  mcq: MCQ,
}) {
  return (
    <RadioGroup value={mcqOptionSelected}>
      {options.map((option, index) => (
        <div
          key={index}
          onClick={() => optionSelector({ mcq, valueSelected: option.value })}
          className="flex  flex-row justify-start  items-center h-auto w-full  space-x-2 break-all"
        >
          <div className="  w-[10%] h-full flex justify-center items-center   ">
            <RadioGroupItem value={option.value} id={option.correct} className=" " />
          </div>
          <div className="  w-[90%] h-full">
            <Label className=" w-full h-full text-base  " htmlFor={option.correct}>
              {option.value}
            </Label>
          </div>
        </div>
      ))}
    </RadioGroup>
  );
}
