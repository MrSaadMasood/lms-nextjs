type RoleBasedUser = UserRole | AdminRole;

interface UserRole {
  id: string;
  username: string;
  email: string;
  password: string;
  role: "USER";
  subscription_type: Subscription;
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
type Subscription = "NONE" | "PERM" | "TEMP"
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

type ProjectBuyType = "Token Pack" | "Premium Ultra"

type TestSearchCategory = "academy" | "exam" | "subject"

type CategoryData = {
  id: string;
  name: string;
  category?: "academy";
} | {
  paper_category: string;
  category?: "exam";
} | {
  subject: string;
  category?: "subject";
}

type SelectFormForTestOptions = {
  placeholder: string,
  type: TestSearchCategory | "year" | "filter",
  condition: () => boolean,
  list: string[]
}
type CategoryCorrespondingMappedObject = {
  exam: SelectFormForTestOptions[],
  subject: SelectFormForTestOptions[],
  academy: SelectFormForTestOptions[]
}


type SelectedOptionsMap<T> = {
  category: TestSearchCategory,
  filter: T,
  exam: T,
  year: T,
  subject: T,
  academy: T,
  academyId: T
}
