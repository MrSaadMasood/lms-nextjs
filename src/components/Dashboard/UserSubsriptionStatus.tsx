export default function UserSubscriptionStatus({
  index,
  heading,
  value,
}: {
  index: number;
  heading: string;
  value: string;
}) {
  return (
    <>
      <section
        className={`w-full ${index === 0 && "mt-2"} font-bold text-sm flex justify-between items-center`}
      >
        <header className="font-normal">{heading}</header>
        <div>{value}</div>
      </section>
    </>
  );
}
