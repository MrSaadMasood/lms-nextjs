import { createPool } from "@vercel/postgres";
import { POSTGRES_URL } from "../envValidator";

const pool = createPool({
  connectionString: POSTGRES_URL,
}).on("error", (err) => {
  console.log("The error in the pg connection is", err)
  process.exit(1)
});
export { pool };
