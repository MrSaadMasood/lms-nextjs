import "client-only";

class TestSearchCategory {
  generateYearList(
    _fetchedDataForTestFiltering: DataForTestFiltering,
    _selectedOption: SelectedOptionsMap<string>,
    _booleanOptionsForYearList: BooleanOptionsForYearList,
  ) {
  }

  overallSubjectYearList(fetchedDataForTestFiltering: DataForTestFiltering) {
    return fetchedDataForTestFiltering.subjectList.map(
      item => item.paper_year.toString()
    )

  }

  choosenSubjectYearList(fetchedDataForTestFiltering: DataForTestFiltering, subject: string) {
    return fetchedDataForTestFiltering.subjectList.filter(
      item => item.subject === subject
    ).map(
      item => item.paper_year.toString()
    )
  }

  choosenExamYearList(fetchedDataForTestFiltering: DataForTestFiltering, exam: string) {
    return fetchedDataForTestFiltering.examList.filter(
      item =>
        item.paper_category === exam
    ).map(
      item => item.paper_year.toString()

    )
  }


  academyChoosenYearList(fetchedDataForTestFiltering: DataForTestFiltering, academy_name: string) {
    return fetchedDataForTestFiltering.academyList.filter(
      item =>
        item.academy_name === academy_name
    ).map(
      item => item.paper_year.toString()
    )
  }
}

class AcademyCategory extends TestSearchCategory {
  generateYearList(
    fetchedDataForTestFiltering: DataForTestFiltering,
    selectedOption: SelectedOptionsMap<string>,
    booleanOptionsForYearList: BooleanOptionsForYearList,
  ) {
    const {
      subjectChoosenAfterFilterExist,
      isSubjectFilterSelected,
      isExamFilterSelected,
      examChoosenAfterFilterExist,
    } = booleanOptionsForYearList

    if (isSubjectFilterSelected && !subjectChoosenAfterFilterExist)
      return this.overallSubjectYearList(fetchedDataForTestFiltering)
    else if (isExamFilterSelected && !examChoosenAfterFilterExist) {
      return fetchedDataForTestFiltering.examList.map(
        item => item.paper_year.toString()
      )
    }
    else if (subjectChoosenAfterFilterExist)
      return this.choosenSubjectYearList(fetchedDataForTestFiltering, selectedOption.subject)
    else if (examChoosenAfterFilterExist)
      return this.choosenExamYearList(fetchedDataForTestFiltering, selectedOption.exam)
    return []
  }
}


class ExamCategory extends TestSearchCategory {
  generateYearList(fetchedDataForTestFiltering: DataForTestFiltering, selectedOption: SelectedOptionsMap<string>, booleanOptionsForYearList: BooleanOptionsForYearList) {
    const {
      subjectChoosenAfterFilterExist,
    } = booleanOptionsForYearList

    if (!subjectChoosenAfterFilterExist)
      return this.overallSubjectYearList(fetchedDataForTestFiltering)
    else if (subjectChoosenAfterFilterExist)
      return this.choosenSubjectYearList(fetchedDataForTestFiltering, selectedOption.subject);
    return []
  }
}

class SubjectCategory extends TestSearchCategory {
  generateYearList(fetchedDataForTestFiltering: DataForTestFiltering, selectedOption: SelectedOptionsMap<string>, booleanOptionsForYearList: BooleanOptionsForYearList) {
    const {
      isAcademyFilterSelected,
      academyChoosenAfterFilterExist,
      isYearFilterSelected
    } = booleanOptionsForYearList

    if (isAcademyFilterSelected && !academyChoosenAfterFilterExist) {
      return fetchedDataForTestFiltering.academyList.map(
        item => item.paper_year.toString()
      )
    }
    else if (academyChoosenAfterFilterExist)
      return this.academyChoosenYearList(fetchedDataForTestFiltering, selectedOption.academy)
    else if (isYearFilterSelected) {
      return fetchedDataForTestFiltering.yearList.map(
        item => item.paper_year.toString()
      )
    }
    return []
  }
}

export {
  AcademyCategory,
  ExamCategory, SubjectCategory
};

