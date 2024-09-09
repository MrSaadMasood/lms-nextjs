import { defineConfig } from "drizzle-kit"
import { config } from 'dotenv'
config({ path: ".env.development.local" })

export default defineConfig({
  schema: "./src/lib/drizzle/schema.ts",
  out: "./src/lib/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
    ssl: true
  },
  verbose: true,
  strict: true

})
