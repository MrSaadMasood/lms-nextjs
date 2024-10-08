import { Session } from "next-auth";
import { coinHistoricalDataSchema, cryptoSchema } from "../zodSchema";

type SessionProp = {
  session: Session;
};

type ChartTypeOptions = {
  general: "price" | "market cap" | "trading view";
  shape: "line" | "bar";
  timeline: "1d" | "7d" | "1m" | "3m";
};

type GeneralChartOptions<Type extends "bar" | "line"> = ChartOptions<Type>;

type RealTimeCardInitialData<T> = {
  total_users: T,
  total_mcq_bank: T,
  total_mcq_solved: T,
  performance?: T,
  free_tokens: T,
  subscription_type: Subscription
}

type CardInitialData<T> = Omit<RealTimeCardInitialData<T>, "free_tokens" | "subscription_type"> & { activeUsers: T }

type PerformanceFilter = "weekly" | "monthly" | "yearly"
type ExtendedTestResultSchemaWithUserId = z.infer<typeof testResultSchema> & { user_id: string }
type testResultSchema = Record<string, z.infer<typeof testResultSchema>>

type CryptoTableData = z.infer<typeof cryptoSchema>
type CoinHistoricalData = z.infer<typeof coinHistoricalDataSchema>
type SpecificCoinData = z.infer<typeof specifCoinSchema>

type MarketDataKey = keyof MarketDataOfSpecificCoin
