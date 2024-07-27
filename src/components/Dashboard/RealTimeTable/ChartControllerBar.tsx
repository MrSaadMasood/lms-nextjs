import { ChartTypeOptions } from "@/lib/types/exported-types";
import { clsx } from "clsx";
import { FaChartBar } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";

type ChartControllerBarProps = {
  chartTypeOptions: ChartTypeOptions;
  chartTypeOptionsUpdator: (prop: string, value: string) => void;
};
function ChartControllerBar({
  chartTypeOptions,
  chartTypeOptionsUpdator,
}: ChartControllerBarProps) {
  return (
    <div
      className="  w-full h-auto md:h-10 flex flex-col justify-center items-center space-y-2
      md:flex md:flex-row md:justify-start md:items-center md:space-x-2 "
    >
      {/* general */}
      <div
        className=" w-full md:w-auto p-1 bg-gray-200 h-full flex justify-evenly
        md:justify-start items-center space-x-1
          rounded-lg "
      >
        {["Price", "Market Cap", "Trading View"].map((option, index) => (
          <button
            key={index}
            className={clsx(
              " p-2  text-xs hover:text-black font-bold duration-300 rounded-md ",
              chartTypeOptions.general.includes(option.toLowerCase())
                ? " bg-white shadow-gray-400 text-black shadow-sm "
                : " text-gray-600 ",
            )}
            onClick={() => {
              chartTypeOptionsUpdator("general", option.toLowerCase());
              if (option === "Trading View") chartTypeOptionsUpdator("shape", "line");
            }}
          >
            {option}
          </button>
        ))}
      </div>
      {chartTypeOptions.general !== "trading view" && (
        <div className=" flex justify-center items-center space-x-2">
          {/* chart type  */}
          <div
            className="  w-auto p-1 bg-gray-200 h-full flex justify-start items-center space-x-1
          rounded-lg "
          >
            {[
              { shape: "line", Icon: FaChartLine },
              { shape: "bar", Icon: FaChartBar },
            ].map((options, index) => (
              <button
                key={index}
                onClick={() => chartTypeOptionsUpdator("shape", options.shape)}
                className={clsx(
                  " p-2 rounded-md  hover:text-black  ",
                  chartTypeOptions.shape === options.shape
                    ? " bg-white shadow-gray-400 text-black shadow-sm "
                    : " text-gray-600 ",
                )}
              >
                <options.Icon />
              </button>
            ))}
          </div>

          {/* chart timeline */}
          <div
            className="  w-auto p-1 bg-gray-200 h-full flex justify-start items-center space-x-1
          rounded-lg text-xs font-bold "
          >
            {["1d", "7d", "1m", "3m"].map((option, index) => (
              <button
                className={clsx(
                  " p-2  text-xs hover:text-black font-bold duration-300 rounded-md ",
                  chartTypeOptions.timeline === option
                    ? " bg-white shadow-gray-400 text-black shadow-sm "
                    : " text-gray-600 ",
                )}
                onClick={() => chartTypeOptionsUpdator("timeline", option)}
                key={index}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ChartControllerBar;
