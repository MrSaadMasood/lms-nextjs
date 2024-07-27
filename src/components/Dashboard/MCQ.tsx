import { RadioGroupForMCQ } from "./RadioGroupForMCQ";

function MCQ({ result }: { result: string | null }) {
  return (
    <div
      className="  text-black w-full h-auto rounded-2xl p-2 
          flex flex-col justify-start items-start bg-white border border-black
          space-y-2"
    >
      <div className=" font-bold text-base  ">Question 1</div>
      <div className="  text-base h-auto ">
        What is the value of x in hello hslfjlsjflsajl determine the right anser
      </div>
      {!result && <RadioGroupForMCQ />}
      {result && (
        <ul className=" w-[80%] h-auto  p-2 ">
          {[
            "defaulths asdfjlk asjdfl javc., lj lkajsdflkj lkjas laklsdjflksjdfklajsdfljklasjdflkajlkjsdlk jflasfj ljdsalfa dljflj ldj nlcl kjdlskfj laj lksjd la",
            "confortable",
            "hello",
            "another",
          ].map((statement, index) => (
            <li
              className={` ${index === 1 && "bg-yellow-500 border-2 border-black "}  rounded-xl p-2`}
              key={index}
            >
              <span className=" font-bold ">a: </span>
              {statement}
            </li>
          ))}
        </ul>
      )}
      {result && (
        <>
          <div className=" font-bold ">Explanation:</div>
          <div className=" w-full h-full flex flex-col justify-center items-center ">
            <div className=" w-[90%] h-auto p-2  rounded-xl ">
              jsldfj l jasdfj lasj jasdlf j alsjdf lja jlasjd sjfljow oj ljl jc alksdjf s
              sdflsdfjsljf lsj asj fljs ljsl jj lkjdfasdfjsdlfj aslj fl
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MCQ;
