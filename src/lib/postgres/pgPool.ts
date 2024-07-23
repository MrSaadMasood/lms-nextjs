import { createPool } from "@vercel/postgres";
import { POSTGRES_URL } from "../envValidator";

const pool = createPool({
  connectionString: POSTGRES_URL,
});
export { pool };
