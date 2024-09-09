import "client-only"
import { z } from "zod";


const envSchema = z.object({
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
});

const env = envSchema.parse(process.env);
const {
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
} = env;

export {
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
};
