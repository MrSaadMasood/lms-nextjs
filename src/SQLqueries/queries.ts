import { db } from "@/lib/drizzle";
import { LmsAdminsTable, LmsUsersTable } from "@/lib/drizzle/schema";
import { and, eq } from "drizzle-orm";

export async function signUpBasedOnRoleQuery<T extends string>(
  username: T,
  email: T,
  hashedPassword: T,
  loginMethod: LoginMethod,
  role: Roles,
) {
  if (role === "USER") {
    // INSERT INTO lms_users (
    //   username,
    //   email, 
    //   password,
    //   login_method
    // ) VALUES (
    //   ${username},
    //   ${email}, 
    //   ${hashedPassword}, 
    //   ${loginMethod}
    // );
    return db.insert(LmsUsersTable).values({
      username,
      email,
      password: hashedPassword,
      login_method: loginMethod,
    })
  } else {
    //   INSERT INTO lms_admins(
    //   username,
    //   email,
    //   password
    // ) VALUES(
    //   ${username},
    //   ${email},
    //   ${hashedPassword}
    // ); 
    return db.insert(LmsAdminsTable).values({
      username,
      email,
      password: hashedPassword
    })
  }
}

export async function resetPasswordQueries<T extends string>(
  email: T,
  hashedPassword: T,
  role: Roles,
) {
  if (role === "USER") {
    // UPDATE lms_users 
    //   SET password = ${hashedPassword} 
    // WHERE email = ${email};
    return db.update(LmsUsersTable).set({
      password: hashedPassword
    }).where(eq(LmsUsersTable.email, email))
  } else {
    // UPDATE lms_admins 
    //   SET password = ${hashedPassword} 
    // WHERE email = ${email}; 
    return db.update(LmsAdminsTable).set({
      password: hashedPassword
    }).where(eq(LmsAdminsTable.email, email));
  }
}

export async function getUserQuery(email: string, loginMethod = "NORMAL" as LoginMethod) {
  // `SELECT * FROM lms_users
  //   WHERE email = ${email} AND login_method = ${loginMethod};`;
  return db.select()
    .from(LmsUsersTable)
    .where(
      and(
        eq(LmsUsersTable.email, email),
        eq(LmsUsersTable.login_method, loginMethod)
      )
    )
}

export async function getAdminQuery(email: string) {
  // `SELECT * FROM lms_admins
  // WHERE email = ?`;
  return db.select().from(LmsAdminsTable).where(eq(LmsAdminsTable.email, email))
}
