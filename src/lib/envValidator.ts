import { z } from "zod";

const envSchema = z.object({
  AUTH_GOOGLE_SECRET: z.string(),
  AUTH_GOOGLE_ID: z.string(),
  AUTH_URL: z.string().optional(),
  AUTH_SECRET: z.string(),
  EMAIL: z.string().email(),
  POSTGRES_URL: z.string().optional(),
  AUTH_TRUST_HOST: z.coerce.boolean(),
});

const env = envSchema.parse(process.env);
const {
  AUTH_SECRET,
  AUTH_URL,
  EMAIL,
  AUTH_GOOGLE_SECRET,
  AUTH_GOOGLE_ID,
  POSTGRES_URL,
  AUTH_TRUST_HOST,
} = env;

export {
  AUTH_GOOGLE_ID,
  AUTH_GOOGLE_SECRET,
  AUTH_SECRET,
  EMAIL,
  AUTH_URL,
  POSTGRES_URL,
  AUTH_TRUST_HOST,
};
