import { z } from "zod"

const envSchema = z.object({
  AUTH_GOOGLE_SECRET: z.string(),
  AUTH_GOOGLE_ID: z.string(),
  BASE_URL: z.string(),
  AUTH_SECRET: z.string(),
  EMAIL: z.string().email(),
  MONGO_URL: z.string()
})

const env = envSchema.parse(process.env)

export { env }
