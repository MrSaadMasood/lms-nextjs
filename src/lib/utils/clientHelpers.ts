import "client-only"
import { AcademyCategory, ExamCategory, SubjectCategory } from "@/Classes/client/TestSearchCategory"
import { testResultSchema } from "../types/exported-types"

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


export function isCorrectOptionSelectedForMCQ(mcq: MCQ, valueSelected: string) {
  let correctOption: string;
  switch (mcq.correct_option) {
    case "A":
      correctOption = mcq.option_a
      break;
    case "B":
      correctOption = mcq.option_b
      break;
    case "C":
      correctOption = mcq.option_c
      break;
    case "D":
      correctOption = mcq.option_d
      break;
  }
  return correctOption === valueSelected
}

export function initialTestDifficultySetter(userPerformanceAverage: number) {
  if (userPerformanceAverage >= 70) return 2
  else if (userPerformanceAverage >= 50) return 1
  else return 0
}

export function adjustDifficulty(solvedWithinTime: boolean, wasPrevAnsCorrect: boolean, currentDifficulty: number) {
  if (solvedWithinTime && wasPrevAnsCorrect && currentDifficulty < 2) {
    return currentDifficulty + 1
  }
  else if (!solvedWithinTime || !wasPrevAnsCorrect) {
    return currentDifficulty === 0 ? 0 : currentDifficulty - 1
  }
  return currentDifficulty
}


export function isAtEndOfArray<T>(array: T[], currLength: number) {
  return array.length === currLength
}

export function selectMCQBasedOnAdjustedDifficulty(difficultyToUse: TestDifficulty, mcqToUseRecord: Record<TestDifficulty, MCQ[]>, lookupNumber: number) {
  return mcqToUseRecord[difficultyToUse][lookupNumber]
}


export function handleMCQArrayExhaustion(
  mcqToUseRecord: Record<TestDifficulty, MCQ[]>,
  lookUpNumberPerDifficulty: Record<TestDifficulty, number>,
  difficulty: number
) {

  const availableDifficulty: TestDifficulty[] = ["EASY", "MEDIUM", "HARD"]
  while (difficulty >= 0) {
    if (difficulty === 0) {
      const currentDifficulty = availableDifficulty[difficulty]
      while (isAtEndOfArray(mcqToUseRecord[currentDifficulty], lookUpNumberPerDifficulty[currentDifficulty] + 1)) difficulty++
      return difficulty
    }
    const currentDifficulty = availableDifficulty[difficulty]
    if (!isAtEndOfArray(mcqToUseRecord[currentDifficulty], lookUpNumberPerDifficulty[currentDifficulty] + 1)) {
      return difficulty
    }
    difficulty--
  }
  return 0
}

export function seggregateResultsBasedOnSubjects(allSovledMCQs: MCQExtendedForUserSelection[]) {
  const seggregationMap: testResultSchema = {}
  for (const solvedMCQ of allSovledMCQs) {
    const ifSeggregatedBySubject = seggregationMap[solvedMCQ.subject]
    const isCorrectOptionSelected = isCorrectOptionSelectedForMCQ(solvedMCQ, solvedMCQ.current_selected_option)
    const correct = isCorrectOptionSelected ? 1 : 0
    const wrong = !isCorrectOptionSelected ? 1 : 0
    const isEasy = solvedMCQ.difficulty === "EASY" ? 1 : 0
    const isMedium = solvedMCQ.difficulty === "MEDIUM" ? 1 : 0
    const isHard = solvedMCQ.difficulty === "HARD" ? 1 : 0

    seggregationMap[solvedMCQ.subject] = {
      subject: solvedMCQ.subject,
      total_solved: (ifSeggregatedBySubject?.total_solved || 0) + 1,
      total_incorrect: (ifSeggregatedBySubject?.total_incorrect || 0) + wrong,
      total_hard: (ifSeggregatedBySubject?.total_hard || 0) + isHard,
      total_medium: (ifSeggregatedBySubject?.total_medium || 0) + isMedium,
      total_easy: (ifSeggregatedBySubject?.total_easy || 0) + isEasy,
      total_correct: (ifSeggregatedBySubject?.total_correct || 0) + correct
    }
  }
  return seggregationMap
}


