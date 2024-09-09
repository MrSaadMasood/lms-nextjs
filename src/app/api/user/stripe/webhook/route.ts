import { updateUserSubscriptionAndToken } from "@/SQLqueries/userQueries";
import { auth } from "@/lib/authJs/auth";
import { STRIPE_WEBHOOK_SECRET } from "@/lib/envValidator";
import { stripe } from "@/lib/stripe/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get("Stripe-Signature") as string
    let event: Stripe.Event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET)

    const session = event.data.object as Stripe.Checkout.Session
    if (!session.metadata) return new NextResponse("METADATA_NOT_FOUND", { status: 400 })
    const userId = session.metadata.userId as string
    const packagePrice = Number(session.metadata.packagePrice)

    if (event.type === "checkout.session.completed") {
      await updateUserSubscriptionAndToken(userId, packagePrice)
    }
    return new NextResponse(null, { status: 200 })
  } catch (error) {
    return new NextResponse("WEBHOOK_ERROR", { status: 400 })
  }
}
