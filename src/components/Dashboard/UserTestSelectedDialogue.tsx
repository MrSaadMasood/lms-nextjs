import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import useToaster from "@/hooks/useToaster";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SelectForm from "./SelectForm";

export default function UserTestSelectedDialogue({
  title,
  optionSelected,
  selectedCategory,
}: {
  title: string;
  optionSelected: string;
  selectedCategory: number;
}) {
  const [selectedOption, setSelectedOption] = useState({
    filter: "",
    exam: selectedCategory === 1 ? optionSelected : "",
    year: "",
    subject: selectedCategory === 2 ? optionSelected : "",
    academy: selectedCategory === 0 ? optionSelected : "",
  });
  const { errorToast } = useToaster();
  const router = useRouter();

  const examList = ["English", "Chemistry"];
  const selectItems = ["Exam", "Subject"];

  function shouldSubjectSelectionShown() {
    let showSubjectSelection = false;
    if (selectedCategory === 0 && selectedOption.filter === "subject") showSubjectSelection = true;
    if (selectedCategory === 1) showSubjectSelection = true;
    return showSubjectSelection;
  }
  function shouldYearSelectionShown() {
    let showYearSelection = false;
    if (
      selectedCategory === 0 &&
      selectedOption.filter &&
      (selectedOption.subject || selectedOption.exam)
    )
      showYearSelection = true;
    if (selectedCategory === 1 && selectedOption.subject) showYearSelection = true;
    if (selectedCategory === 2) showYearSelection = true;
    return showYearSelection;
  }
  function changeValue(value: string, type: string) {
    setSelectedOption((prev) => ({
      ...prev,
      [type]: type === "year" ? parseInt(value) : value.toLowerCase(),
    }));
  }
  function redirectToTestPage() {
    const { exam, subject } = selectedOption;
    if (selectedCategory === 0 && !exam && !subject) return errorToast("Fill All Required Fields");
    router.push(
      `/dashboard/user/test?academy=${selectedOption.academy}&exam=${selectedOption.exam}&subject=${selectedOption.subject}&year=${selectedOption.year}`,
    );
  }

  return (
    <Dialog>
      {/* trigget  */}
      <DialogTrigger asChild>
        <Button
          className="w-full md:w-[45%] lg:w-[30%] h-[10%]  border-2 border-violet-200 hover:border-violet-900
            flex justify-center items-center rounded-xl duration-300 "
          variant="outline"
        >
          {title.slice(0, 20)}
        </Button>
      </DialogTrigger>
      {/* content */}
      <DialogContent className="w-[90%] h-auto duration-300 rounded-2xl">
        <DialogHeader>
          <DialogTitle>Filter Options</DialogTitle>
          <DialogDescription>
            Filter it according to your needs. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        {selectedCategory === 0 && (
          <SelectForm
            selectedOption={selectedOption.filter}
            changeValue={changeValue}
            placeholder="Filter by"
            type="filter"
            list={selectItems}
          />
        )}
        {selectedCategory === 0 && selectedOption.filter === "exam" && (
          <SelectForm
            placeholder={`${optionSelected} offers following exam tests`}
            selectedOption={selectedOption.exam}
            changeValue={changeValue}
            type="exam"
            list={examList}
          />
        )}
        {shouldSubjectSelectionShown() && (
          <SelectForm
            placeholder={"Select a subject for test"}
            selectedOption={selectedOption.subject}
            changeValue={changeValue}
            type="subject"
            list={examList}
          />
        )}
        {shouldYearSelectionShown() && (
          <SelectForm
            placeholder="Filter by Year"
            selectedOption={selectedOption.year.toString()}
            changeValue={changeValue}
            type="year"
            list={["2011", "2022"]}
          />
        )}
        <DialogFooter>
          <Button onClick={() => redirectToTestPage()}>Start Test</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
