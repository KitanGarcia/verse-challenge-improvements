import { Dispatch, SetStateAction } from "react";

interface GraphSelectorProps {
  isLineChart: boolean;
  showLineChart: boolean;
  setShowLineChart: Dispatch<SetStateAction<boolean>>;
}

const GraphSelectorProps = ({
  isLineChart,
  showLineChart,
  setShowLineChart,
}: GraphSelectorProps) => {
  return (
    <button
      className={`rounded-full px-16 py-2 mx-4 ${
        isLineChart === showLineChart ? "bg-black" : "bg-disabled"
      }
        ${isLineChart === showLineChart ? "text-white" : "text-black"}
        ${isLineChart === showLineChart ? "cursor-default" : "cursor-pointer"}
        `}
      onClick={() =>
        isLineChart ? setShowLineChart(true) : setShowLineChart(false)
      }
    >
      {isLineChart ? "Line Chart" : "Heat Map"}
    </button>
  );
};

export default GraphSelectorProps;
