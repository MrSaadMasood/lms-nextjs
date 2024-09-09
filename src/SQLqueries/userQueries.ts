import "server-only"
import { db } from "@/lib/drizzle";
import { LmsAcademyTable, LmsAdminsTable, LmsTestDataTable, LmsUsersTable, LmsUserStatsTable } from "@/lib/drizzle/schema";
import { PerformanceFilter, RealTimeCardInitialData } from "@/lib/types/exported-types";
import { getPreviousDate } from "@/lib/utils/serverHelpers";
import { asc, desc, eq, ilike, or, SQL, sql, sum } from "drizzle-orm";
import { LucideMessageCircleDashed } from "lucide-react";

export async function realTimeCardInitialDataQuery(id: string, performance: PerformanceFilter) {
  const date = new Date()
  // SELECT 
  //     (SELECT COUNT(*) FROM lms_users) AS total_users, 
  //     (SELECT COUNT(*) FROM lms_test_data) AS total_mcq_bank, 
  //     (SELECT COUNT(*) FROM lms_user_stats WHERE date = ${date}) AS total_mcq_solved
  //     (SELECT SUM(total_correct) * 100 / SUM(total_solved) AS performance FROM ${LmsUserStatsTable}
  //       WHERE 
  //       user_id = ${id} AND 
  //       date >= ${new Date(getPreviousDate(performance, new Date())).toLocaleDateString()} AND
  //       date <= ${new Date().toLocaleDateString()})
  //     (SELECT free_tokens 
  //       FROM lms_users 
  //       WHERE iid = ${id}) AS free_tokens,
  //     (SELECT subscription_type 
  //       FROM lms_users 
  //       WHERE id = ${id}) AS subscription_type;
  //;
  return db.execute(sql<RealTimeCardInitialData<number>[]>` 
  SELECT 
    (SELECT COUNT(*) FROM ${LmsUsersTable}) AS total_users, 
    (SELECT COUNT(*) FROM  ${LmsTestDataTable}) AS total_mcq_bank, 
    (SELECT COUNT(*) FROM ${LmsUserStatsTable} WHERE date = ${date.toLocaleDateString()}) AS total_mcq_solved,
    (SELECT SUM(total_correct) * 100 / SUM(total_solved) AS performance FROM ${LmsUserStatsTable}
      WHERE 
      user_id = ${id} AND 
      date >= ${new Date(getPreviousDate(performance, new Date())).toLocaleDateString()} AND
      date <= ${new Date().toLocaleDateString()}),
    (SELECT free_tokens 
     FROM lms_users 
     WHERE id = ${id}) AS free_tokens,
    (SELECT subscription_type 
     FROM lms_users 
     WHERE id = ${id}) AS subscription_type;
`)

}

export async function userDashboardBarChartPersonalizedData(id: string) {
  console.log("the user id in the personalized data is", id)
  // **overall stats**
  // SELECT 
  //     SUM(total_solved) AS total_solved, 
  //     SUM(total_correct) AS total_correct, 
  //     SUM(total_incorrect) AS total_incorrect, 
  //     subject 
  // FROM 
  //     lms_user_stats 
  // WHERE 
  //     user_id = ${user_id} 
  // GROUP BY 
  //     subject;

  const overallStats = db.select({
    total_solved: sum(LmsUserStatsTable.total_solved).mapWith(Number),
    total_correct: sum(LmsUserStatsTable.total_correct).mapWith(Number),
    total_incorrect: sum(LmsUserStatsTable.total_incorrect).mapWith(Number),
    subject: LmsUserStatsTable.subject,
  })
    .from(LmsUserStatsTable)
    .where(eq(LmsUserStatsTable.user_id, id))
    .groupBy(LmsUserStatsTable.subject)

  // **accuracy**
  // SELECT 
  //     SUM(total_correct) * 100 / SUM(total_solved) AS accuracy, 
  //     DATE_TRUNC('week', date) AS interval 
  // FROM 
  //     lms_user_stats 
  // WHERE 
  //     user_id = ${user_id} 
  // GROUP BY 
  //     interval 
  // ORDER BY 
  //     interval;

  const accuracy = db.execute(sql<{ accuracy: number, interval: Date }[]>`
    SELECT 
        SUM(total_correct) * 100 / SUM(total_solved) AS accuracy, 
        DATE_TRUNC('week', date) AS interval 
    FROM 
        lms_user_stats 
    WHERE 
        user_id = ${id} 
    GROUP BY 
        interval 
    ORDER BY 
        interval DESC
    LIMIT 10;
  `)

  // **weekly activity**
  // SELECT 
  //     SUM(total_solved) AS total_solved, 
  //     DATE_TRUNC('week', date) AS week_interval 
  // FROM 
  //     lms_user_stats 
  // WHERE 
  //     user_id = ${user_id} 
  // GROUP BY 
  //     date;


  const weeklyActivity = db.execute(sql<{ total_solved: number, week_interval: Date }[]>`
    SELECT 
        SUM(total_solved) AS total_solved, 
        DATE_TRUNC('week', date) AS week_interval 
    FROM 
        lms_user_stats 
    WHERE 
        user_id = ${id} 
    GROUP BY 
        week_interval
    ORDER BY
        week_interval DESC
    LIMIT 10;
`)

  // ** per subject difficulty stats**
  // SELECT 
  //     SUM(total_hard) AS total_hard, 
  //     SUM(total_medium) AS total_medium, 
  //     SUM(total_easy) AS total_easy, 
  //     subject 
  // FROM 
  //     lms_user_stats 
  // WHERE 
  //     user_id = ${user_id} 
  // GROUP BY 
  //     subject;

  const perSubjectDifficultyStats = db.select({
    total_hard: sum(LmsUserStatsTable.total_hard).mapWith(Number),
    total_medium: sum(LmsUserStatsTable.total_medium).mapWith(Number),
    total_easy: sum(LmsUserStatsTable.total_easy).mapWith(Number),
    subject: LmsUserStatsTable.subject
  })
    .from(LmsUserStatsTable)
    .where(eq(LmsUserStatsTable.user_id, id))
    .groupBy(LmsUserStatsTable.subject)

  return Promise.all([accuracy, weeklyActivity, overallStats, perSubjectDifficultyStats])
}


export async function updateUserSubscriptionAndToken(id: string, price: number) {
  return db.execute(sql`
    UPDATE lms_users 
    SET 
      subscription_type = ${price === 300 ? 'TEMP' : 'PERM'},
      free_tokens = (
            SELECT free_tokens 
            FROM lms_users
            WHERE id = ${id} 
        ) + 500
    WHERE 
      id = ${id};
`)
}

export async function getUserFromDatabase(email: string) {
  return db.select({
    username: LmsUsersTable.username,
    login_method: LmsUsersTable.login_method,
    free_tokens: LmsUsersTable.free_tokens,
    subscription_type: LmsUsersTable.subscription_type,
    id: LmsUsersTable.id,
    role: LmsUsersTable.role,
  }).from(LmsUsersTable)
    .where(eq(LmsUsersTable.email, email))
}

export async function getTestSearchCategoryBasedInfo(category: TestSearchCategory, discover: string | null) {
  switch (category) {
    case "academy":
      // SELECT id, name FROM lms_academy WHERE name ILIKE '%${discover}%';
      return db.select({
        id: LmsAcademyTable.id,
        name: LmsAcademyTable.name
      }).from(LmsAcademyTable)
        .where(ilike(LmsAcademyTable.name, `%${discover}%`))
    case "exam":
      // SELECT DISTINCT paper_category
      // FROM lms_test_data WHERE paper_category ILIKE '%${discover}%';
      return db.selectDistinct({
        paper_category: LmsTestDataTable.paper_category
      })
        .from(LmsTestDataTable)
        .where(ilike(LmsTestDataTable.paper_category, `%${discover}%`))
    default:
      // SELECT DISTINCT subject FROM lms_test_data WHERE subject ILIKE '%${discover}%';
      return db.selectDistinct({
        subject: LmsTestDataTable.subject
      }).from(LmsTestDataTable)
        .where(ilike(LmsTestDataTable.subject, `%${discover}%`))
  }
}

export async function examTestsOfferedByAcademy(academyId: string) {
  // SELECT 
  //     paper_category, 
  //     paper_year 
  // FROM 
  //     lms_test_data 
  // WHERE 
  //     academy_id = ${academyId} 
  // GROUP BY 
  //     paper_category, 
  //     paper_year 
  // ORDER BY 
  //     paper_category ASC, 
  //     paper_year DESC;
  //
  return db.select({
    paper_category: LmsTestDataTable.paper_category,
    paper_year: LmsTestDataTable.paper_year
  }).from(LmsTestDataTable).
    where(eq(LmsTestDataTable.academy_id, academyId))
    .groupBy(LmsTestDataTable.paper_category, LmsTestDataTable.paper_year)
    .orderBy(asc(LmsTestDataTable.paper_category), desc(LmsTestDataTable.paper_year))
}

export async function subjectTestOfferedByAcademy(academyId: string) {
  // SELECT 
  //     subject, 
  //     paper_year 
  // FROM 
  //     lms_test_data 
  // WHERE 
  //     academy_id = '3bfa9e12-be41-4e5b-bd8d-c6aa57ecdd33'
  // GROUP BY 
  //     subject, 
  //     paper_year 
  // ORDER BY 
  //     subject ASC, 
  //     paper_year DESC;
  return db.select({
    subject: LmsTestDataTable.subject,
    paper_year: LmsTestDataTable.paper_year
  }).from(LmsTestDataTable)
    .where(eq(LmsTestDataTable.academy_id, academyId))
    .groupBy(LmsTestDataTable.subject, LmsTestDataTable.paper_year)
    .orderBy(asc(LmsTestDataTable.subject), desc(LmsTestDataTable.paper_year))
}

export async function subjectListPresentInExam(examName: string) {
  // SELECT 
  //     subject, 
  //     paper_year 
  // FROM 
  //     lms_test_data 
  // WHERE 
  //     paper_category = 'IELTS' 
  // GROUP BY 
  //     subject, 
  //     paper_year 
  // ORDER BY 
  //     subject ASC, 
  //     paper_year DESC;
  return db.select({
    subject: LmsTestDataTable.subject,
    paper_year: LmsTestDataTable.paper_year
  }).from(LmsTestDataTable)
    .where(eq(LmsTestDataTable.paper_category, examName))
    .groupBy(LmsTestDataTable.subject, LmsTestDataTable.paper_year)
    .orderBy(asc(LmsTestDataTable.subject), desc(LmsTestDataTable.paper_year))
}

export async function academiesThatOfferSubject(subject: string) {
  // SELECT 
  //     lms_test_data.paper_year, 
  //     lms_academy.name 
  // FROM 
  //     lms_academy 
  // INNER JOIN 
  //     lms_test_data 
  // ON 
  //     lms_academy.id = lms_test_data.academy_id 
  // WHERE 
  //     subject = ${subject} 
  // GROUP BY 
  //     lms_test_data.paper_year, 
  //     lms_academy.name 
  // ORDER BY 
  //     lms_test_data.name ASC, 
  //     lms_academy.name DESC;
  return db.select({
    academy_name: LmsAcademyTable.name,
    paper_year: LmsTestDataTable.paper_year
  }).from(LmsAcademyTable)
    .innerJoin(LmsTestDataTable, eq(LmsAcademyTable.id, LmsTestDataTable.academy_id))
    .where(eq(LmsTestDataTable.subject, subject))
    .groupBy(LmsAcademyTable.name, LmsTestDataTable.paper_year)
    .orderBy(asc(LmsAcademyTable.name), desc(LmsTestDataTable.paper_year))
}

export async function paperYearListOfSubjectFromAllAcademies(subject: string) {
  // SELECT DISTINCT 
  //     paper_year 
  // FROM 
  //     lms_test_data 
  // WHERE 
  //     subject = ${paper_year} 
  // ORDER BY 
  //     paper_year DESC;
  return db.selectDistinct({
    paper_year: LmsTestDataTable.paper_year
  }).from(LmsTestDataTable)
    .where(eq(LmsTestDataTable.subject, subject))
    .orderBy(desc(LmsTestDataTable.paper_year))
}

export async function deductTokensFromUserForTest(id: string) {
  // BEGIN TRANSACTION;
  //
  // UPDATE lms_users
  // SET free_tokens = free_tokens - 100
  // WHERE id = ${id};
  //
  // COMMIT TRANSACTION;
  // ROLLBACK TRANSACTION;
  return db.transaction(async (tx) => {
    try {
      await tx.update(LmsUsersTable)
        .set({ free_tokens: sql`${LmsUsersTable.free_tokens} - 100` })
        .where(eq(LmsUsersTable.id, id));
    } catch (error) {
      tx.rollback()
    }
  })
}
