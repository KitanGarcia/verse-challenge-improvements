import { Dispatch, SetStateAction } from "react";

interface GraphSelectorProps {
  isLineChart: boolean;
  showLineChart: boolean;
  setShowLineChart: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const GraphSelectorProps = ({
  isLineChart,
  showLineChart,
  setShowLineChart,
  setIsLoading,
}: GraphSelectorProps) => {
  const handleClick = () => {
    isLineChart ? setShowLineChart(true) : setShowLineChart(false);
    if (isLineChart === showLineChart) {
      setIsLoading(true);
    }
  };
  return (
    <button
      className={`rounded-full px-16 py-2 mx-4 ${
        isLineChart === showLineChart ? "bg-black" : "bg-disabled"
      }
        ${isLineChart === showLineChart ? "text-white" : "text-black"}
        ${isLineChart === showLineChart ? "cursor-default" : "cursor-pointer"}
        `}
      onClick={handleClick}
    >
      {isLineChart ? "Line Chart" : "Heat Map"}
    </button>
  );
};

export default GraphSelectorProps;
