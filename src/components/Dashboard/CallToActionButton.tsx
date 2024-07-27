import Link from "next/link";
import { LuCheckCircle } from "react-icons/lu";

export default function CallToActionButton({ content, link }: { content: string; link: string }) {
  return (
    <button
      className=" font-bold text-sm  p-2 rounded-3xl flex justify-between items-center
            border border-violet-300 space-x-2"
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
