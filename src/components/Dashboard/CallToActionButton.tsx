import Link from "next/link";
import { LuCheckCircle } from "react-icons/lu";
import { clsx } from "clsx"

export default function CallToActionButton({ content, link }: { content: string; link: string }) {
  const shouldRecharge = content.toLowerCase().includes("recharge")
  return (
    <button
      className={clsx(` font-bold text-sm  p-2 rounded-3xl flex justify-between items-center
            border border-violet-300 space-x-2`, shouldRecharge && " bg-[#d9283b] text-white p-4 ")}
    >
      <div>
        <LuCheckCircle size={20} />
      </div>
      <Link href={link} className="text-sm">
        {content}
      </Link>
    </button>
  );
}
