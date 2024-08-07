type RoleBasedUser = UserRole | AdminRole;

interface UserRole {
  id: string;
  username: string;
  email: string;
  password: string;
  role: "USER";
  subscription_type: Subsctiption;
  free_tokens: number;
  login_method: LoginMethod;
}
interface AdminRole {
  id: string;
  role: "ADMIN";
  username: string;
  email: string;
  password: string;
}

type Roles = "ADMIN" | "USER";
type Subsctiption = "NONE" | "PERM" | "TEMP"
type LoginMethod = "NORMAL" | "GOOGLE"
