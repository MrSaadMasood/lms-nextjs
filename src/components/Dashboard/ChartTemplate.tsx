function ChartTemplate({
  margin = "h-[18.5rem]",
  heading,
  children,
}: {
  margin?: string;
  heading: string;

  children: React.ReactNode;
}) {
  return (
    <section
      className={`   mt-2 relative w-full 
      md:w-[50%] flex flex-col justify-center  items-center ${margin}`}
    >
      <h2 className="text-xl text-white font-bold w-[95%] h-[20%] flex justify-start items-center">
        {heading}
      </h2>
      {children}
    </section>
  );
}

export default ChartTemplate;
