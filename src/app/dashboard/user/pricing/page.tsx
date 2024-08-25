import PricingCard from "@/components/Dashboard/PricingCard";
import { priceCardData } from "@/lib/variables/constants";

export default function Pricing() {
  return (
    <section
      className="bg-violet-700 w-screen md:w-full md:h-full h-screen
      overflow-hidden overflow-y-scroll noScroll text-black"
    >
      <h2
        className="text-4xl md:text-6xl text-white  font-bold  h-20 w-full 
        flex justify-center items-center mt-2  "
      >
        Pricing
      </h2>
      <div
        className="w-full h-40  flexcol 
        "
      >
        <h3
          className=" w-[80%] md:w-[50%] text-white   text-center flexrow
          md:text-xl  "
        >
          Take as many tests and you want. Measure you performance and get your stats visualized for
          better insight
        </h3>
      </div>
      <section
        className=" w-full h-[60rem] md:h-[40rem]    mt-2  flexrow
        mb-20 md:mb-0"
      >
        <div
          className=" w-[95%] h-full flex 
          flex-col md:flex-row md:justify-around md:items-center 
          justify-start items-center space-y-4 md:space-y-0 "
        >
          {priceCardData.map((cardData, index) => (
            <PricingCard
              price={cardData.price}
              desc={cardData.desc}
              callToAction={cardData.callToAction}
              heading={cardData.heading}
              list={cardData.list}
              key={index}
            />
          ))}
        </div>
      </section>
    </section>
  );
}
