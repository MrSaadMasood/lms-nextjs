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
type TestDifficulty = "EASY" | "MEDIUM" | "HARD"
type CorrectOption = "A" | "B" | "C" | "D"

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
  type: ExtendedTestFilters,
  showOptionsForForm: boolean,
  list: string[]
}

type ExtendedTestFilters = TestSearchCategory | "year" | "filter"

type CategoryCorrespondingMappedObject = {
  exam: SelectFormForTestOptions[],
  subject: SelectFormForTestOptions[],
  academy: SelectFormForTestOptions[]
}


type SelectedOptionsMap<T> = {
  category: TestSearchCategory,
  filter: TestFilterByOptions,
  exam: T,
  year: T,
  subject: T,
  academy: T,
  academyId: T
}

type DataForTestFiltering = {
  examList: { paper_category: string, paper_year: number }[],
  subjectList: { subject: string, paper_year: number }[],
  academyList: { academy_name: string, paper_year: number, academy_id: string }[]
  yearList: { paper_year: number }[]
}

type TestFilterByOptions = "Academy" | "Subject" | "Exam" | "Year"

type BooleanOptionsForYearList = {
  subjectChoosenAfterFilterExist: boolean,
  examChoosenAfterFilterExist: boolean,
  academyChoosenAfterFilterExist: boolean,
  isSubjectFilterSelected: boolean,
  isExamFilterSelected: boolean,
  isAcademyFilterSelected: boolean,
  isYearFilterSelected: boolean,
}

type GetTestFilters<T> = {
  academy: T,
  category: TestSearchCategory,
  year: T,
  exam: T,
  subject: T
  filter: TestFilterByOptions,
  academy_id: T
}

type MCQ = {
  id: number;
  subject: string,
  statement: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  explanation: string;
  difficulty: TestDifficulty;
  correct_option: CorrectOption
  current_selected_option?: string
}

type Option = {
  value: string, correct: CorrectOption
}


type OptionSelector = {
  mcq: MCQ,
  valueSelected: string
}

type MCQExtendedForUserSelection = MCQ & {
  current_selected_option: string
}


type MarketDataOfSpecificCoin = {
  current_price: number;
  market_cap: number;
  fully_diluted_valuation: number;
  total_supply: number;
  max_supply: number;
  circulating_supply: number;
}
