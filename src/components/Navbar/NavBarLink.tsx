import Link from "next/link";

export default function NavbarLink({ content, to }: { content: string; to: string }) {
  return (
    <Link
      href={to}
      className="justify-center  p-2 rounded-lg hover:text-black duration-200
        items-center text-slate-600 text-base font-semibold leading-normal flex"
    >
      {content}
    </Link>
  );
}
