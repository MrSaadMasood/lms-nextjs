import { auth } from "@/lib/authJs/auth";
import { CustomNextRequest } from "@/lib/types/nextRequest";
import { testSelectedOptionZodSchema, zodString } from "@/lib/zodSchema";
import { examTestsOfferedByAcademy, subjectTestOfferedByAcademy } from "@/SQLqueries/userQueries";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req: CustomNextRequest) {
  try {
    const session = req.auth;
    const body = await req.json();
    console.log("the req body is", body);
    const parseSelectedOptions = testSelectedOptionZodSchema.safeParse(body)
    if (parseSelectedOptions.success) {

      const dataForTestFiltering: {
        examList: { paper_category: string, paper_year: number }[],
        subjectList: { subject: string, paper_year: number }[],
        academyList: { academy_name: string, paper_year: number }[]
      } = {
        examList: [],
        subjectList: [],
        academyList: [],
      }
      const selectedOptions = parseSelectedOptions.data
      console.log("the selected Options is", selectedOptions)
      switch (selectedOptions.category) {
        case "academy":
          if (selectedOptions.filter === "exam") {
            dataForTestFiltering.examList = await examTestsOfferedByAcademy(selectedOptions.academyId)
          }
          else {
            dataForTestFiltering.subjectList = await subjectTestOfferedByAcademy(selectedOptions.academyId)
          }
          break;
        case "exam":



        default:
          break;
      }
      return NextResponse.json(dataForTestFiltering)
    }
    else throw new Error


  } catch (error) {
    return new NextResponse("Input Validation Failed", { status: 401 })
  }
})
