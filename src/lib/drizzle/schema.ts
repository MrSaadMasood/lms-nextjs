import { pgTable, uuid, varchar, integer, serial, text, date, pgEnum, index } from 'drizzle-orm/pg-core'

export const userRole = pgEnum("user_role", ["ADMIN", "USER"])
export const subscriptionTypeEnum = pgEnum("subscription_type", ["NONE", "PERM", "TEMP"])
export const loginMethodEnum = pgEnum("login_method", ["NORMAL", "GOOGLE"])
export const correctOptionEnum = pgEnum("correct_option", ["A", "B", "C", "D"])
export const difficultyEnum = pgEnum("difficulty", ["EASY", "MEDIUM", "HARD"])

export const LmsUsersTable = pgTable("lms_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar("username", { length: 300 }).notNull().unique(),
  email: varchar("email", { length: 200 }).notNull().unique(),
  password: varchar("password", { length: 300 }).notNull(),
  role: userRole("user_role").notNull().default("USER"),
  subscription_type: subscriptionTypeEnum("subscription_type").notNull().default("NONE"),
  free_tokens: integer("free_tokens").notNull().default(300),
  login_method: loginMethodEnum("login_method").notNull().default("NORMAL")
})

export const LmsAdminsTable = pgTable("lms_admins", {
  id: uuid("id").primaryKey().defaultRandom(),
  role: userRole("user_role").notNull().default("ADMIN"),
  username: varchar("username", { length: 300 }).notNull().unique(),
  password: varchar("password", { length: 300 }).notNull(),
  email: varchar("email", { length: 200 }).notNull().unique(),
})

export const LmsAcademyTable = pgTable("lms_academy", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 300 }).notNull().unique(),
  admin_id: uuid("admin_id").notNull().references(() => LmsAdminsTable.id),
  public_password: varchar("public_password", { length: 300 })
})

export const LmsTestDataTable = pgTable("lms_test_data", {
  id: serial("id").primaryKey(),
  subject: varchar("subject", { length: 128 }).notNull(),
  paper_category: varchar("paper_category", { length: 128 }).notNull(),
  academy_id: uuid("academy_id").notNull().references(() => LmsAcademyTable.id),
  statement: text("statement").notNull(),
  option_a: text("option_a").notNull(),
  option_b: text("option_b").notNull(),
  option_c: text("option_c").notNull(),
  option_d: text("option_d").notNull(),
  correct_option: correctOptionEnum("correct_option").notNull(),
  explanation: varchar("explanation").notNull(),
  paper_year: integer("paper_year").notNull(),
  difficulty: difficultyEnum("difficulty").notNull()
}, (table) => {
  return {
    subjectIndex: index("subjectIndex").on(table.subject),
    yearIndex: index("yearIndex").on(table.paper_year),
    category: index("categoryIndex").on(table.paper_category)
  }
})

export const LmsUserStatsTable = pgTable("lms_user_stats", {
  user_id: uuid("user_id").notNull().references(() => LmsUsersTable.id),
  subject: varchar("subject", { length: 128 }).notNull(),
  total_solved: integer("total_solved").notNull(),
  total_correct: integer("total_correct").notNull(),
  total_incorrect: integer("total_incorrect").notNull(),
  total_hard: integer("total_hard").notNull(),
  total_medium: integer("total_medium").notNull(),
  total_easy: integer("total_easy").notNull(),
  date: date("date").notNull().defaultNow()
}, (table) => {
  return {
    subjectStatIndex: index("subjectStatIndex").on(table.subject)
  }
})

