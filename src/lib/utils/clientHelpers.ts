import "client-only"
import { AcademyCategory, ExamCategory, SubjectCategory } from "@/Classes/client/TestSearchCategory"

export const categoryMappedClasses = {
  exam: ExamCategory,
  subject: SubjectCategory,
  academy: AcademyCategory
}

export function duplicateRemover<T>(array: T[]) {
  return [...new Set(array)]
}

export function selectFormForTestOptionsGenerator({
  placeholder,
  type,
  showOptionsForForm,
  list
}: {
  placeholder: string,
  type: ExtendedTestFilters,
  showOptionsForForm: boolean,
  list: string[]
}): SelectFormForTestOptions {
  return {
    placeholder,
    type,
    showOptionsForForm,
    list,
  }
}

export function resetSelectedFiltersOptions(selectedOptions: SelectedOptionsMap<string>) {
  switch (selectedOptions.category) {
    case "academy":
      selectedOptions.exam = ""
      selectedOptions.subject = ""
      selectedOptions.year = ""
      break;
    case "subject":
      selectedOptions.academy = ""
      selectedOptions.year = ""
      break;
  }
  return selectedOptions
}

export function yearListCorrespondingToChoosenOptions(
  fetchedDataForTestFiltering: DataForTestFiltering,
  selectedOption: SelectedOptionsMap<string>,
  booleanOptionsForYearList: BooleanOptionsForYearList,
) {
  const CategoryBasedClass = categoryMappedClasses[selectedOption.category]
  const categoryBasedClass = new CategoryBasedClass();
  return categoryBasedClass.generateYearList(fetchedDataForTestFiltering, selectedOption, booleanOptionsForYearList)
}

export function showExamSelectionOptions(isExamCategorySelected: boolean, filterSelected: TestFilterByOptions) {
  if (isExamCategorySelected || filterSelected.toLowerCase() === "exam") return true
  else return false
}

export function showYearSelectionOptions(isExamCategorySelected: boolean, isFilterByOptionSelected: boolean) {
  if (isFilterByOptionSelected || isExamCategorySelected) return true
  else return false
}

export function showSubjectSelectionOptions(isExamCategorySelected: boolean, filterSelected: TestFilterByOptions) {
  if (filterSelected.toLowerCase() === "subject" || isExamCategorySelected) return true
  else return false
}

export function showAcademySelectionOptions(isSubjectCategorySelected: boolean, filterSelected: TestFilterByOptions) {
  if (isSubjectCategorySelected && filterSelected.toLowerCase() === "academy") return true
  return false
}

export function generateCategoryCorrespondingObject({
  fetchedDataForTestFiltering,
  selectedOption
}: {
  fetchedDataForTestFiltering: DataForTestFiltering,
  selectedOption: SelectedOptionsMap<string>
}): CategoryCorrespondingMappedObject {
  const filterSelected = selectedOption.filter
  const {
    isAcademyFilterSelected,
    isYearFilterSelected,
    isExamFilterSelected,
    isSubjectFilterSelected,
    isAcademyCategorySelected,
    isSubjectCategorySelected,
    isExamCategorySelected,
    subjectChoosenAfterFilterExist,
    examChoosenAfterFilterExist,
    academyChoosenAfterFilterExist,
  } = testSearchRelatedBooleanValuesGenerator(selectedOption)

  function subjectSelectFormGenerator() {
    return selectFormForTestOptionsGenerator({
      placeholder: "Choose a Subject",
      type: "subject",
      showOptionsForForm: showSubjectSelectionOptions(isExamCategorySelected, filterSelected),
      list: duplicateRemover(fetchedDataForTestFiltering.subjectList.map(
        item => item.subject
      ))
    })
  }


  function yearSelectFormGenerator() {
    return selectFormForTestOptionsGenerator({
      placeholder: "Choose a Year",
      type: "year",
      showOptionsForForm: showYearSelectionOptions(isExamCategorySelected, !!filterSelected),
      list: duplicateRemover(wrapperForYearListGenerator())
    })
  }

  function wrapperForYearListGenerator() {
    return yearListCorrespondingToChoosenOptions(
      fetchedDataForTestFiltering,
      selectedOption,
      {
        subjectChoosenAfterFilterExist,
        examChoosenAfterFilterExist,
        academyChoosenAfterFilterExist,
        isSubjectFilterSelected,
        isExamFilterSelected,
        isAcademyFilterSelected,
        isYearFilterSelected,
      }
    )
  }

  return {
    exam: [
      subjectSelectFormGenerator(),
      yearSelectFormGenerator()
    ],
    subject: [
      selectFormForTestOptionsGenerator({
        placeholder: "Filter By",
        type: "filter",
        showOptionsForForm: isSubjectCategorySelected,
        list: ["Academy", "Year"]
      }),
      selectFormForTestOptionsGenerator({
        placeholder: "Choose an Academy",
        type: "academy",
        showOptionsForForm: showAcademySelectionOptions(isSubjectCategorySelected, filterSelected),
        list: duplicateRemover(fetchedDataForTestFiltering.academyList.map(
          item => item.academy_name))
      }),
      yearSelectFormGenerator()
    ],
    academy: [
      selectFormForTestOptionsGenerator({
        placeholder: "Filter By",
        type: "filter",
        showOptionsForForm: isAcademyCategorySelected,
        list: ["Exam", "Subject"]
      }),
      selectFormForTestOptionsGenerator({
        placeholder: "Choose an Exam",
        type: "exam",
        showOptionsForForm: showExamSelectionOptions(isExamCategorySelected, filterSelected),
        list: duplicateRemover(
          fetchedDataForTestFiltering.examList.map(
            item => item.paper_category))
      }),
      subjectSelectFormGenerator(),
      yearSelectFormGenerator()
    ],
  }
}

export function testSearchRelatedBooleanValuesGenerator(selectedOption: SelectedOptionsMap<string>) {
  const { filter, category, exam, subject, year, academy } = selectedOption

  const isAcademyFilterSelected = filter === "Academy"
  const isYearFilterSelected = filter === "Year"
  const isExamFilterSelected = filter === "Exam"
  const isSubjectFilterSelected = filter === "Subject"

  const isAcademyCategorySelected = category === "academy"
  const isSubjectCategorySelected = category === "subject"
  const isExamCategorySelected = category === "exam"


  const subjectChoosenAfterFilterExist = !!subject
  const examChoosenAfterFilterExist = !!exam
  const academyChoosenAfterFilterExist = !!academy
  const yearChoosenAfterFilterExist = !!year

  return {
    isAcademyFilterSelected,
    isYearFilterSelected,
    isExamFilterSelected,
    isSubjectFilterSelected,
    isAcademyCategorySelected,
    isSubjectCategorySelected,
    isExamCategorySelected,
    subjectChoosenAfterFilterExist,
    examChoosenAfterFilterExist,
    academyChoosenAfterFilterExist,
    yearChoosenAfterFilterExist
  }
}

