import { Dispatch, SetStateAction } from "react";

interface GraphSelectorProps {
  showLineChart: boolean;
  setShowLineChart: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const GraphSelector = ({
  showLineChart,
  setShowLineChart,
  setIsLoading,
}: GraphSelectorProps) => {
  const handleClick = (isLineChart: boolean) => {
    isLineChart ? setShowLineChart(true) : setShowLineChart(false);
    if (isLineChart === showLineChart) {
      setIsLoading(true);
    }
  };
  return (
    <div data-testid="graph-selector">
      <button
        data-testid="linechart-selector"
        className={`rounded-full px-16 py-2 mx-4 ${
          showLineChart ? "bg-black" : "bg-disabled"
        }
        ${showLineChart ? "text-white" : "text-black"}
        ${showLineChart ? "cursor-default" : "cursor-pointer"}
        `}
        onClick={() => handleClick(true)}
      >
        Line Chart
      </button>
      <button
        data-testid="heatmap-selector"
        className={`rounded-full px-16 py-2 mx-4 ${
          !showLineChart ? "bg-black" : "bg-disabled"
        }
        ${!showLineChart ? "text-white" : "text-black"}
        ${!showLineChart ? "cursor-default" : "cursor-pointer"}
        `}
        onClick={() => handleClick(false)}
      >
        Heat Map
      </button>
    </div>
  );
};

export default GraphSelector;
