import { z } from "zod";
const envSchema = z.object({
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
  NEXT_PUBLIC_COIN_GECKO_API_KEY: z.string().min(1)
})

const env = envSchema.parse(process.env);

const {
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  NEXT_PUBLIC_COIN_GECKO_API_KEY
} = env

export {
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  NEXT_PUBLIC_COIN_GECKO_API_KEY
}
