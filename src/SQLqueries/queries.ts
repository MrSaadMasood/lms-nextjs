import { pool } from "@/lib/postgres/pgPool";

export async function signUpBasedOnRoleQuery<T extends string>(
  username: T, email: T, hashedPassword: T, loginMethod: T, role: "admin" | "user"
) {
  if (role === "user") {
    const signUpUser = await pool.sql`
    INSERT INTO lms_users (
      username,
      email, 
      password,
      login_method
    ) VALUES (
      ${username},
      ${email}, 
      ${hashedPassword}, 
      ${loginMethod}
    );`;
    if (!signUpUser.rowCount) throw new Error("failed to sign up user")
    return true
  }
  else {
    const signUpAdmin = await pool.sql`
      INSERT INTO lms_admins(
        username,
        email,
        password
      ) VALUES (
        ${username},
        ${email},
        ${hashedPassword}
      );`
    if (!signUpAdmin.rowCount) throw new Error("failed to sign up admin")
    return true
  }
}

export async function resetPasswordQueries<T extends string>
  (email: T, hashedPassword: T, role: Roles) {
  if (role === "user") {
    const updatedUser = await pool.sql`
      UPDATE lms_users 
        SET password = ${hashedPassword} 
      WHERE email = ${email};`
    if (!updatedUser.rowCount) return false
    return true
  }
  else {
    const updatedAdmin = await pool.sql`
      UPDATE lms_admins 
        SET password = ${hashedPassword} 
      WHERE email = ${email};`
    if (!updatedAdmin.rowCount) return false
    return true
  }
}

export async function getUserQuery(email: string, loginMethod = 'normal') {
  return await pool.sql<RoleBasedUser>`
    SELECT * FROM lms_users
    WHERE email = ${email} AND login_method = ${loginMethod};`

}

export async function getAdminQuery(email: string) {
  return await pool.sql<RoleBasedUser>`
    SELECT * FROM lms_admins
    WHERE email = ${email}`
}
