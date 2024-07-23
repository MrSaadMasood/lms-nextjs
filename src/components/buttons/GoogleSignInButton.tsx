"use client";
import { signInToGoogle } from "@/actions/action";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
export default function GoogleSignInButton() {
  const session = useSession();
  console.log("the session is", session);
  const pathname = usePathname();

  if (pathname === "/signup") {
    return null;
  }

  return (
    <button
      className="w-[20rem] p-2 flex justify-center items-center space-x-2
      rounded-lg bg-white border-2 border-violet-400 font-bold cursor-pointer"
      onClick={() => signInToGoogle()}
    >
      <span>
        <FaGoogle />
      </span>{" "}
      <p>Sign In With Google</p>{" "}
    </button>
  );
}
