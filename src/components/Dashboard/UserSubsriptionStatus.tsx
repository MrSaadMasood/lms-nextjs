export default function UserSubscriptionStatus({
  index,
  heading,
  value,
}: {
  index: number;
  heading: string;
  value: number | Subscription;
}) {

  function getMemberShipType(value: Subscription) {
    switch (value) {
      case "PERM":
        return "Premium"
      case "TEMP":
        return "Temporary"
      default:
        return "None";
    }
  }

  return (
    <>
      <section
        className={`w-full ${index === 0 && "mt-2"} font-bold text-sm flex justify-between items-center`}
      >
        <header className="font-normal">{heading}</header>
        <div>{typeof value === 'number' ? value : getMemberShipType(value)}</div>
      </section>
    </>
  );
}
