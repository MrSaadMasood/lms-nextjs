type RoleBasedUser = UserRole | AdminRole

interface UserRole {

  id: string
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  role: "user",
  subscription_type: string,
  free_tokens: string,
  login_method: string

}
interface AdminRole {
  id: string
  role: "admin"
  username: string
  email: string
  password: string
}

type Roles = "admin" | "user"
