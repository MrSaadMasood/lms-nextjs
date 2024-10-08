import { auth } from "@/lib/authJs/auth";
import { ExtendedTestResultSchemaWithUserId } from "@/lib/types/exported-types";
import { CustomNextRequest } from "@/lib/types/nextRequest";
import { testResultSchema } from "@/lib/zodSchema";
import { addUserTestRecordToDatabase } from "@/SQLqueries/userQueries";
import { NextResponse } from "next/server";
import { z } from "zod";


export const POST = auth(async function POST(req: CustomNextRequest) {
  try {
    const authContext = req.auth
    const user = authContext.user as UserRole
    const body = await req.json()
    const testResultsParsed = z.record(z.string(), testResultSchema).parse(body);
    const testResultsMappedWithUserId: ExtendedTestResultSchemaWithUserId[] = Object
      .values(testResultsParsed).map(result => {
        result.user_id = user.id
        return result
      })
    await addUserTestRecordToDatabase(user.id, testResultsMappedWithUserId)
    return NextResponse.json("Test Result Successfully Submitted", { status: 200 })
  } catch (error) {
    return NextResponse.json("Test Result Submission Failed", { status: 400 })
  }

})
