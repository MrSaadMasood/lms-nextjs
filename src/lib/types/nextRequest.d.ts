import { NextRequest } from "next/server";

interface CustomNextRequest extends NextRequest {
  auth: Session | null
}
