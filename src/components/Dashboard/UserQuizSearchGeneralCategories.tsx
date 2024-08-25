import { clsx } from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function UserQuizSearchGeneralCategories() {

  const searchCategories = ["Academy", "Exam", "Subject"];
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)

  function addParamsSearchCategory(index: number) {
    params.set("category", searchCategories[index].toLowerCase())
    router.replace(`${pathname}?${params}`)
  }

  return (
    <ul className="w-full h-16  flex justify-between items-center p-2 ">
      {searchCategories.map((category, index) => {
        const isSelected = category.toLowerCase() === params.get("category");
        return (
          <li
            key={index}
            onClick={() => addParamsSearchCategory(index)}
            className="w-[33%] h-full cursor-pointer 
            flex flex-col justify-start items-center mt-3 md:mt-5"
          >
            <div
              className={clsx(
                isSelected && "font-bold text-base md:text-xl text-violet-700",
                !isSelected && " text-gray-500 text-sm md:text-base ",
              )}
            >
              {category}
            </div>
            {isSelected && <span className="  text-violet-700 text-xl">&#x2022;</span>}
          </li>
        );
      })}
    </ul>
  );
}

export default UserQuizSearchGeneralCategories;
