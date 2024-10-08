function DashboardLayoutTemplate({ children }: { children: React.ReactNode }) {
  return (
    <ul
      className="w-full h-[75%] flex flex-col justify-start items-center
      space-y-2"
    >
      {children}
    </ul>
  );
}

export default DashboardLayoutTemplate;
