import CallToActionButton from "./CallToActionButton";
import ChartTemplate from "./ChartTemplate";

export default function TakeTestCall() {
  return (
    <ChartTemplate heading="Featured">
      <section className="bg-white w-[95%] h-[90%] rounded-3xl flex flex-col justify-center items-center">
        <div
          className=" w-14 h-14 absolute top-[4em] left-[1.5em]  
            bg-violet-200 rounded-full"
        ></div>
        <div
          className=" w-14 h-14 absolute bottom-[1em] right-[1.5em]  
            bg-violet-200 rounded-full"
        ></div>
        <h3
          className=" font-bold text-lg w-[60%] h-[50%] flex justify-center items-center 
            text-center"
        >
          Take you learning to the next level and Challenge yourself
        </h3>
        <CallToActionButton content="Take The Test" link="/dashboard/user/test" />
      </section>
    </ChartTemplate>
  );
}