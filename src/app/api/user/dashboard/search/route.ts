import { auth } from "@/lib/authJs/auth";
import { CustomNextRequest } from "@/lib/types/nextRequest";
import { testSelectedOptionZodSchema } from "@/lib/zodSchema";
import { academiesThatOfferSubject, examTestsOfferedByAcademy, paperYearListOfSubjectFromAllAcademies, subjectListPresentInExam, subjectTestOfferedByAcademy } from "@/SQLqueries/userQueries";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req: CustomNextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const selectedOptions = Object.fromEntries(searchParams.entries())

    const parseSelectedOptions = testSelectedOptionZodSchema.safeParse(selectedOptions)
    if (parseSelectedOptions.success) {

      const dataForTestFiltering: DataForTestFiltering = {
        examList: [],
        subjectList: [],
        academyList: [],
        yearList: []
      }
      const selectedOptions = parseSelectedOptions.data
      switch (selectedOptions.category) {
        case "academy":
          if (selectedOptions.filter.toLowerCase() === "exam") {
            dataForTestFiltering.examList = await examTestsOfferedByAcademy(selectedOptions.academyId)
          }
          else {
            dataForTestFiltering.subjectList = await subjectTestOfferedByAcademy(selectedOptions.academyId)
          }
          break;
        case "exam":
          dataForTestFiltering.subjectList = await subjectListPresentInExam(selectedOptions.exam)
          break;
        case "subject":
          if (selectedOptions.filter.toLowerCase() === "academy") {
            dataForTestFiltering.academyList = await academiesThatOfferSubject(selectedOptions.subject)
          } else {
            dataForTestFiltering.yearList = await paperYearListOfSubjectFromAllAcademies(selectedOptions.subject)
          }
          break;
      }
      return NextResponse.json(dataForTestFiltering)
    }
    else throw new Error


  } catch (error) {
    return new NextResponse("Input Validation Failed", { status: 401 })
  }
})
