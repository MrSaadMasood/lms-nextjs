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
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';
import SelectForm from "./SelectForm";
import useToaster from "@/hooks/useToaster";

export default function UserTestSelectedDialogue({
  title,
  category,
  academyId,
  // selectedOption,
  // changeValue
}: {
  academyId: string,
  title: string;
  category: TestSearchCategory;
  // selectedOption: SelectedOptionsMap<string>
  // changeValue: (type: string, value: string) => void
}) {
  const [selectedOption, setSelectedOption] = useState<SelectedOptionsMap<string>>({
    category,
    filter: "",
    exam: "",
    year: "",
    subject: "",
    academy: "",
    academyId
  });
  console.log("The selected Options is", selectedOption)
  const [fetchedDataForTestFiltering, setFetchedDataForTestFiltering] = useState({
    examList: [],
    subjectList: [],
    academyList: [],
    yearList: [],
  })
  const [openDialog, setOpenDialog] = useState(false)
  const isAcademySelected = category === "academy"
  const isSubjectSelected = category === "subject"
  const isExamSelected = category === "exam"
  const router = useRouter();
  const { errorToast } = useToaster()

  const changeValue = useCallback((value: string, type: string,) => {
    setSelectedOption((prev) => ({
      ...prev,
      [type]: type === "year" ? parseInt(value) : value.toLowerCase(),
    }));

  }, [])

  useEffect(() => {
    if (openDialog) {
      changeValue(title, category)
    }
  }, [category, title, openDialog, changeValue])

  useEffect(() => {
    async function getCategorySpecificDataForFurtherFiltering() {
      try {
        const response = await fetch("/api/user/dashboard/search", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedOption)
        })
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        setFetchedDataForTestFiltering(data)
      } catch (error) {
        console.log('the error occured while getting further data for test filteration', error)
        errorToast("Failed To Get Further Filter Options")
      }
    }

    if ((isAcademySelected || isSubjectSelected) && !selectedOption.filter) return
    getCategorySpecificDataForFurtherFiltering()

  }, [selectedOption.filter])


  const examList = ["IELTS", "CSS"];
  const subjectList = ["English", "Chemistry"];
  const academyItems = ["British", "nonBritiths"]
  const yearItems = ["2011", "2022"]


  const categoryCorrespondingMappedObject: CategoryCorrespondingMappedObject = {
    exam: [
      {
        placeholder: "Choose a Subject",
        type: "subject",
        list: subjectList,
        condition: showSubjectSelectionOptions,

      },
      {
        placeholder: "Choose a Year",
        type: "year",
        list: yearItems,
        condition: showYearSelectionOptions
      }
    ],
    subject: [
      {
        placeholder: "Filter By",
        type: "filter",
        list: ["Academy", "Year"],
        condition: showOptionsWhenSelectedCategoryIsSubject
      },
      {
        placeholder: "Choose an Academy",
        type: "academy",
        list: academyItems,
        condition: showAcademySelectionOptions
      },
      {
        placeholder: "Filter By Year",
        type: "year",
        condition: showYearSelectionOptions,
        list: yearItems
      },
    ],
    academy: [
      {
        placeholder: "Filter By",
        type: "filter",
        condition: () => category === "academy",
        list: ["Exam", "Subject"]
      },
      {
        placeholder: "Choose an Exam",
        type: "exam",
        condition: showExamSelectionOptions,
        list: examList
      },
      {
        placeholder: "Choose a Subject",
        type: "subject",
        list: subjectList,
        condition: showSubjectSelectionOptions,
      },
      {
        placeholder: "Filter By Year",
        type: "year",
        condition: showYearSelectionOptions,
        list: yearItems
      }
    ],

  }

  function redirectToTestPage() {
    router.push(
      `/dashboard/user/test?academy=${selectedOption.academy}&exam=${selectedOption.exam}&subject=${selectedOption.subject}&year=${selectedOption.year}`,
    );
  }

  function showExamSelectionOptions() {
    if (isExamSelected || selectedOption.filter === "exam") return true
    else return false
  }

  function showYearSelectionOptions() {
    if (selectedOption.filter || isExamSelected) return true
    else return false
  }

  function showSubjectSelectionOptions() {
    if (selectedOption.filter === "subject" || isExamSelected) return true
    else return false
  }

  function showOptionsWhenSelectedCategoryIsSubject() {
    if (isSubjectSelected) return true
    else return false
  }

  function showAcademySelectionOptions() {
    if (isSubjectSelected && selectedOption.filter === "academy") return true
    return false
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog} >
      {/* trigget  */}
      <DialogTrigger asChild >
        <Button
          className="w-full sm:w-[90%] md:w-[11rem] lg:w-[15rem] xl:w-[18rem] 
          h-12 p-2  border-2 border-violet-200 hover:border-violet-900
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
        {categoryCorrespondingMappedObject[category].map(
          ({ placeholder, type, condition, list }) => {
            if (condition()) return (
              <SelectForm
                key={uuid()}
                placeholder={placeholder}
                selectedOption={selectedOption[type]}
                changeValue={changeValue}
                type={type}
                list={list}
              />
            )
          })}

        <DialogFooter>
          <Button onClick={() => redirectToTestPage()}>Start Test</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  );
}
