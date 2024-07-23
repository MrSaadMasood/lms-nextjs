"use client";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

function GoogleSignInError() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const error = searchParams.get("error");
  if (!error || pathname === "signup") return null;

  return <div className="text-xs text-red-600 text-start">Something went wrong!</div>;
}

export default GoogleSignInError;
