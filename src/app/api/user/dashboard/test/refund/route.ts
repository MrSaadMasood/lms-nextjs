import { auth } from "@/lib/authJs/auth";
import { CustomNextRequest } from "@/lib/types/nextRequest";
import { getUserFromDatabase, refundTokensIfTestNotFound } from "@/SQLqueries/userQueries";
import { NextResponse } from "next/server";

export const PUT = auth(async function PUT(req: CustomNextRequest) {
  try {
    const { user } = req.auth as { user: UserRole }
    const userFromDatabase = (await getUserFromDatabase(user.email))[0]
    if (userFromDatabase.subscription_type === "PERM") return NextResponse.json(
      "Premium User Detected", { status: 201 }
    )
    await refundTokensIfTestNotFound(user.email)
    return NextResponse.json("Token Refund Successfull", { status: 200 })
  } catch (error) {
    return NextResponse.json("Failed To Refund Tokens", { status: 400 })
  }
})
