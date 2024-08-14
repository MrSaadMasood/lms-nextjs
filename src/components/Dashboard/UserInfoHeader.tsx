import { MdSunny } from "react-icons/md";
import UserSubscriptionStatus from "./UserSubsriptionStatus";
import GreetingsWithTimer from "./GreetingsWithTimer";

export function UserInfoHeader({ user }: { user: UserRole }) {
  return (
    <header className="bg-white h-36 w-full flex text-white">
      <section className=" bg-violet-700 h-full w-[70%] flex flex-col justify-center items-center">
        <div className=" h-[30%] w-[90%] flex items-end justify-start">
          <div className="  h-full w-[70%]  flex justify-start items-center space-x-2">
            <GreetingsWithTimer />
          </div>
        </div>
        <div className="  h-[70%] w-[90%] text-gray-200  flex flex-col justify-start items-start">
          <h2 className="text-3xl font-bold">{user.username.substring(0, 23)}</h2>
          {[
            { heading: "Tokens", value: user.free_tokens },
            { heading: "Membership", value: user.subscription_type },
          ].map((item, index) => (
            <UserSubscriptionStatus
              key={index}
              index={index}
              heading={item.heading}
              value={item.value}
            />
          ))}
        </div>
      </section>
      <aside className=" bg-violet-700  h-full w-[30%] flex justify-center items-center">
        <div className="bg-white rounded-full w-20 h-20 flex justify-center items-center text-black">
          P
        </div>
      </aside>
    </header>
  );
}
