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

type OverStats = {
  total_solved: number;
  total_correct: number;
  total_incorrect: number;
  subject: string;
}

type AccuracyStats = {
  accuracy: number,
  interval: Date
}

type WeeklyActivity = {
  total_solved: number,
  week_interval: Date
}

type PerSubjectDifficultyStat = {
  total_hard: number;
  total_medium: number;
  total_easy: number;
  subject: string;
}
