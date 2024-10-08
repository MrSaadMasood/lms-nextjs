import { fetchCategorySpecificDataForFiltering } from "@/fetchRequests/fetch";
import { generateCategoryCorrespondingObject, resetSelectedFiltersOptions, testSearchRelatedBooleanValuesGenerator } from "@/lib/utils/clientHelpers";
import { dataForTestFilteringSchema } from "@/lib/zodSchema";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

function useTestSelection(
  {
    category,
    academyId,
    errorToast
  }: {
    category: TestSearchCategory,
    academyId: string,
    errorToast: (value: string) => void
  }
) {

  const [isFilterChanged, setIsFilterChanged] = useState(false)
  const [selectedOption, setSelectedOption] = useState<SelectedOptionsMap<string>>({
    category,
    filter: "" as TestFilterByOptions,
    exam: "",
    year: "",
    subject: "",
    academy: "",
    academyId
  });
  const [fetchedDataForTestFiltering, setFetchedDataForTestFiltering] = useState<DataForTestFiltering>({
    examList: [],
    subjectList: [],
    academyList: [],
    yearList: [],
  })

  const memoSelectedOption = useMemo(() => selectedOption, [selectedOption])
  const memoFetcheDataForTestFiltering = useMemo(() => fetchedDataForTestFiltering, [fetchedDataForTestFiltering])

  const searchParams = useSearchParams()

  const {
    isAcademyCategorySelected,
    isSubjectCategorySelected,
    isExamCategorySelected,
    subjectChoosenAfterFilterExist,
    examChoosenAfterFilterExist,
    academyChoosenAfterFilterExist,
    yearChoosenAfterFilterExist
  } = testSearchRelatedBooleanValuesGenerator(selectedOption)



  const changeValue = useCallback((value: string, type: string,) => {
    const isFilterBeingChanged = type === "filter"
    setSelectedOption((prev) => {
      if (isFilterBeingChanged) {
        prev = resetSelectedFiltersOptions(prev)
        setIsFilterChanged(true)
      }
      const changedSelectedOption = {
        ...prev,
        [type]: value
      }
      if (category === "subject" && type === "academy") {
        changedSelectedOption.academyId = (memoFetcheDataForTestFiltering
          .academyList.find(academy =>
            academy.academy_name === value))?.academy_id || ""
      }
      return changedSelectedOption
    });
  }, [memoFetcheDataForTestFiltering, category])

  const stopCategroySpecificDataFetcherFromRunning = useCallback(() => {
    if ((isAcademyCategorySelected || isSubjectCategorySelected) && !isFilterChanged) return true
    if (isExamCategorySelected &&
      (!examChoosenAfterFilterExist || memoFetcheDataForTestFiltering.subjectList.length > 1)
    ) return true
    return false

  }, [
    isFilterChanged,
    memoFetcheDataForTestFiltering,
    isAcademyCategorySelected,
    isSubjectCategorySelected,
    isExamCategorySelected,
    examChoosenAfterFilterExist
  ])

  const getCategorySpecificDataForFurtherFiltering = useCallback(
    async () => {
      try {
        const { filter, subject, exam, academyId, category } = memoSelectedOption
        if (stopCategroySpecificDataFetcherFromRunning()) return
        const queryParams = `category=${category}&exam=${exam}&filter=${filter}&subject=${subject}&academyId=${academyId}`
        const response = await fetchCategorySpecificDataForFiltering(queryParams)
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        const dataForTestFiltering = dataForTestFilteringSchema.parse(data)
        setFetchedDataForTestFiltering((pre) => ({
          ...pre,
          ...dataForTestFiltering
        }))
      } catch (error) {
        console.log('the error occured while getting further data for test filteration', error)
        errorToast("Failed To Get Further Filter Options")
      } finally {
        setIsFilterChanged(false)
      }
    }, [
    stopCategroySpecificDataFetcherFromRunning,
    errorToast,
    memoSelectedOption,
  ])

  useEffect(() => {
    getCategorySpecificDataForFurtherFiltering()

  }, [getCategorySpecificDataForFurtherFiltering])



  const categoryCorrespondingMappedObject: CategoryCorrespondingMappedObject = generateCategoryCorrespondingObject({
    fetchedDataForTestFiltering,
    selectedOption
  })


  function createParamsForTestPageNavigation() {
    const params = new URLSearchParams(searchParams)
    const { filter, academy, exam, subject, year, academyId } = selectedOption
    params.set("filter", filter);
    params.set("academy", academy);
    params.set("subject", subject);
    params.set("exam", exam);
    params.set("year", year);
    params.set("academy_id", academyId)
    return params
  }


  function stopUserIfIncompleteOptionsSelected() {
    const isGeneralFilterSelected = selectedOption.filter
    switch (category) {
      case "academy":
        if (
          !isGeneralFilterSelected ||
          (!subjectChoosenAfterFilterExist && !examChoosenAfterFilterExist)
        ) return true
        else return false
      case "exam":
        if (!subjectChoosenAfterFilterExist && !yearChoosenAfterFilterExist) return true;
        else return false
      case "subject":
        if (
          !isGeneralFilterSelected || (
            !academyChoosenAfterFilterExist && !yearChoosenAfterFilterExist
          )
        ) return true
        else return false
    }
  }

  return {
    categoryCorrespondingMappedObject,
    createParamsForTestPageNavigation,
    stopUserIfIncompleteOptionsSelected,
    changeValue,
    selectedOption,
    isFilterChanged
  }
}

export default useTestSelection
