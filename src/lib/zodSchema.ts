import { z } from "zod";

export const zodString = z.string()

export const passwordSchema = z
  .string()
  .min(8, {
    message: "Password must have a minimum of 8 characters",
  })
  .max(24, {
    message: "Password should not be more than 24 characters long",
  })
  .regex(new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* )/), {
    message: "Password must contain a-z, A-Z, 0-9, .!#$%%^&*",
  });

export const nameSchema = z
  .string()
  .min(2, {
    message: "Must have at least 2 characters",
  })
  .max(50, {
    message: "Must have at most 100 characters",
  });

export const char128StringSchema = z.string().min(1, {
  message: "Must have at least 2 characters"
}).max(128, {
  message: "Must have at most 128 characters"
})

export const char300StringSchema = z.string().min(1, {
  message: "Must have at least 2 characters"
}).max(300, {
  message: "Must have at most 300 characters"
})

export const char1000StringSchema = z.string().min(1, {
  message: "Must have at least 2 characters"
}).max(1000, {
  message: "Must have at most 1000 characters"
})

export const testSelectedOptionZodSchema = z.object({
  category: z.union([z.literal("academy"), z.literal("exam"), z.literal("subject")]),
  filter: zodString,
  exam: zodString,
  subject: zodString,
  academyId: zodString
})

const paperYearSchema = z.object({
  paper_year: z.number()
})
export const dataForTestFilteringSchema = z.object({
  examList: z.array(z.object({ paper_category: zodString }).merge(paperYearSchema)),
  subjectList: z.array(z.object({ subject: zodString }).merge(paperYearSchema)),
  academyList: z.array(z.object({ academy_name: zodString, academy_id: zodString }).merge(paperYearSchema)),
  yearList: z.array(paperYearSchema),
})

export const testResultSchema = z.object({
  total_incorrect: z.number(),
  total_correct: z.number(),
  total_solved: z.number(),
  subject: zodString,
  total_hard: z.number(),
  total_medium: z.number(),
  total_easy: z.number(),
  user_id: z.string().optional()
})

export const cryptoSchema = z.object({
  id: z.string(),
  symbol: z.string(),
  name: z.string(),
  image: z.string().url().nullish(),
  current_price: z.number().nullish(),
  market_cap: z.number().nullish(),
  price_change_24h: z.number().nullish(),
  price_change_percentage_24h: z.number().nullish(),
  price_change_percentage_1h_in_currency: z.number().nullish(),
  price_change_percentage_7d_in_currency: z.number().nullish()
});

export const coinHistoricalDataSchema = z.object({
  prices: z.array(z.array(z.number(), z.number())),
  market_caps: z.array(z.array(z.number(), z.number())),
})

export const specifCoinSchema = z.object({
  market_data: z.object({
    current_price: z.record(z.string(), z.number()),
    market_cap: z.record(z.string(), z.number()),
    fully_diluted_valuation: z.record(z.string(), z.number()),
    total_supply: z.number(),
    max_supply: z.number(),
    circulating_supply: z.number()
  }),
})
