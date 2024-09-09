import { auth } from "@/lib/authJs/auth";
import { CustomNextRequest } from "@/lib/types/nextRequest";
import { userExtractor } from "@/lib/utils/serverHelpers";
import { deductTokensFromUserForTest, getUserFromDatabase } from "@/SQLqueries/userQueries";
import { NextResponse } from "next/server";

export const POST = auth(async function POST(req: CustomNextRequest) {
  try {
    const auth = req.auth
    if (!auth) throw new Error("Authorization Error")
    const user = userExtractor(auth)
    const userFromDatabase = (await getUserFromDatabase(user.email))[0];
    if (userFromDatabase.subscription_type === "PERM")
      return NextResponse.json("Permanent Member", { status: 406 })
    if (userFromDatabase.free_tokens === 0)
      return NextResponse.json("Empty Balance! Subscription Required", { status: 402 })
    await deductTokensFromUserForTest(userFromDatabase.id)
    return NextResponse.json("Deducted", { status: 200 })
  } catch (error) {
    return new NextResponse("Some Error Occured", { status: 401 })
  }
})
