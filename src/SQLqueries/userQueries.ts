import { db } from "@/lib/drizzle";
import { LmsTestDataTable, LmsUsersTable, LmsUserStatsTable } from "@/lib/drizzle/schema";
import { PerformanceFilter } from "@/lib/types/exported-types";
import { getPreviousDate } from "@/lib/utils/helpers";
import { eq, sql, sum } from "drizzle-orm";

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
  //;
  return db.execute(sql<{ name: string }[]>` 
  SELECT 
    (SELECT COUNT(*) FROM ${LmsUsersTable}) AS total_users, 
    (SELECT COUNT(*) FROM  ${LmsTestDataTable}) AS total_mcq_bank, 
    (SELECT COUNT(*) FROM ${LmsUserStatsTable} WHERE date = ${date.toLocaleDateString()}) AS total_mcq_solved,
    (SELECT SUM(total_correct) * 100 / SUM(total_solved) AS performance FROM ${LmsUserStatsTable}
      WHERE 
      user_id = ${id} AND 
      date >= ${new Date(getPreviousDate(performance, new Date())).toLocaleDateString()} AND
      date <= ${new Date().toLocaleDateString()}
)
`)

}

export async function userDashboardBarChartPersonalizedData(id: string) {
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
        user_id = 'f0fdf26b-0c91-4e37-ba50-ca91d46ab612' 
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

  return Promise.all([overallStats, accuracy, weeklyActivity, perSubjectDifficultyStats])
}
