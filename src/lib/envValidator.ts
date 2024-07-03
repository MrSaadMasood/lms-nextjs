import { z } from "zod"

const envSchema = z.object({
  AUTH_GOOGLE_SECRET: z.string(),
  AUTH_GOOGLE_ID: z.string(),
  BASE_URL: z.string(),
  AUTH_SECRET: z.string(),
  EMAIL: z.string().email(),
  POSTGRES_URL: z.string().optional(),
})

const env = envSchema.parse(process.env)
const { AUTH_SECRET, BASE_URL, EMAIL, AUTH_GOOGLE_SECRET, AUTH_GOOGLE_ID,
  POSTGRES_URL } = env

export {
  AUTH_GOOGLE_ID,
  AUTH_GOOGLE_SECRET,
  AUTH_SECRET,
  EMAIL,
  BASE_URL,
  POSTGRES_URL
}
