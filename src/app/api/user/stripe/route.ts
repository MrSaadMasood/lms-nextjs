import { auth } from "@/lib/authJs/auth"
import { BASE_URL } from "@/lib/envValidator"
import { stripe } from "@/lib/stripe/stripe"
import { CustomNextRequest } from "@/lib/types/nextRequest"
import { getUserFromDatabase } from "@/SQLqueries/userQueries"
import { NextResponse } from "next/server"
import Stripe from "stripe"
import { z } from "zod"

const zodString = z.string().min(1)

export const POST = auth(async function POST(req: CustomNextRequest) {
  try {
    const session = req.auth
    const body = await req.json()
    if (!session || session.user.role !== "USER")
      return new NextResponse("Unauthorized", { status: 401 })
    const user = (await getUserFromDatabase(session.user.email))[0]
    const productDetailParse = z.object({
      heading: z.union([z.literal("Token Pack"), z.literal("Premium Ultra")]),
      price: z.number(),
      desc: zodString,
    }).safeParse(body)

    if (productDetailParse.success) {
      let packagePrice = productDetailParse.data.heading === "Premium Ultra" ? 500 : 300
      if (
        productDetailParse.data.heading === "Premium Ultra" && user.subscription_type === "PERM"
      ) return new NextResponse("Already Subscribed!", { status: 401 })
      const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: {
              name: productDetailParse.data.heading,
              description: productDetailParse.data.desc,
            },
            unit_amount: Math.round(packagePrice * 100)
          }
        }
      ]
      const stripeSession = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        success_url: `${BASE_URL}/dashboard/user/main?success=1`,
        cancel_url: `${BASE_URL}/dashboard/user/main?success=0`,
        metadata: {
          userId: session.user.id,
          packagePrice
        }
      })
      return NextResponse.json({ url: stripeSession.url })
    } else throw new Error
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 })

  }
})

