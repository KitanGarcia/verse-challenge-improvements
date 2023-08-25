import { Dispatch, SetStateAction } from "react";

interface HeatMapControlsProps {
  heatMapYear: number;
  setHeatMapYear: Dispatch<SetStateAction<number>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const HeatMapControls = ({
  heatMapYear,
  setHeatMapYear,
  setIsLoading,
}: HeatMapControlsProps) => {
  const isActive = (value: number) => {
    return value === heatMapYear ? true : false;
  };

  const handleClick = (event: React.MouseEvent<HTMLHeadingElement>) => {
    const yearAsNumber = parseInt(
      (event.target as HTMLElement).textContent as string
    );
    setHeatMapYear(yearAsNumber);
    setIsLoading(true);
  };

  return (
    <div className="flex w-1/2 justify-evenly rounded-md border-2 bg-nav-bg text-center">
      <h2
        data-testid="heatmap-select-2019"
        className={`my-2 p-2 rounded-full ${
          isActive(2019) ? "text-white bg-black" : "text-secondary-text"
        } cursor-pointer`}
        onClick={(e) => handleClick(e)}
      >
        2019
      </h2>
      <h2
        data-testid="heatmap-select-2020"
        className={`my-2 p-2 rounded-full ${
          isActive(2020) ? "text-white bg-black" : "text-secondary-text"
        } cursor-pointer`}
        onClick={(e) => handleClick(e)}
      >
        2020
      </h2>
      <h2
        data-testid="heatmap-select-2021"
        className={`my-2 p-2 rounded-full ${
          isActive(2021) ? "text-white bg-black" : "text-secondary-text"
        } cursor-pointer`}
        onClick={(e) => handleClick(e)}
      >
        2021
      </h2>
      <h2
        data-testid="heatmap-select-2022"
        className={`my-2 p-2 rounded-full ${
          isActive(2022) ? "text-white bg-black" : "text-secondary-text"
        } cursor-pointer`}
        onClick={(e) => handleClick(e)}
      >
        2022
      </h2>
      <h2
        data-testid="heatmap-select-2023"
        className={`my-2 p-2 rounded-full ${
          isActive(2023) ? "text-white bg-black" : "text-secondary-text"
        } cursor-pointer`}
        onClick={(e) => handleClick(e)}
      >
        2023
      </h2>
    </div>
  );
};

export default HeatMapControls;
