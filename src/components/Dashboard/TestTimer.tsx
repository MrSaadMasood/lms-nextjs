export default function TestTimer({
  timeLeft
}: {
  timeLeft: number
}) {
  return (
    <div className=" w-full flex justify-center items-center p-2 md:p-0 md:flexcol
      space-x-3 md:space-x-2 md:mt-2 ">
      <div className=" text-lg  md:text-2xl font-bold ">Time Left</div>
      <div className=" text-base md:text-xl ">{timeLeft}s</div>
    </div>
  );
}
