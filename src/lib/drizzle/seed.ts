import { db } from '@/lib/drizzle'
import { LmsAcademyTable, LmsAdminsTable, LmsTestDataTable, LmsUsersTable } from './schema';
import { academies, admins, testData, users } from './seedData';

export async function seeder() {
  await db.insert(LmsUsersTable).values(users)
  await db.insert(LmsAdminsTable).values(admins)
  await db.insert(LmsAcademyTable).values(academies)
  await db.insert(LmsTestDataTable).values(testData)

}



