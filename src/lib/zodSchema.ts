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
  academyList: z.array(z.object({ academy_name: zodString }).merge(paperYearSchema)),
  yearList: z.array(paperYearSchema),
}) 
