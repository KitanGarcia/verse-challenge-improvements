import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Image from "next/image";

import data from "../data/caiso_carbon_intensity.json";
import Sidebar from "../components/Sidebar";
import LineChart from "../components/LineChart";
import { IntensityData } from "../types/IntensityData";
import { DataField } from "../types/DataField";
import GraphSelector from "../components/GraphSelector";
import HeatMap from "../components/HeatMap";
import DashboardNavbar from "../components/DashboardNavbar";

import * as dataUtils from "../utils/data";
import HeatMapControls from "../components/HeatMapControls";

const CarbonIntensity: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showLineChart, setShowLineChart] = useState(true);
  const [allIntensities, setAllIntensities] = useState<Array<IntensityData>>(
    []
  );
  const [intensityOfYear, setIntensityOfYear] = useState<Array<IntensityData>>(
    []
  );

  // Min and max carbon intensities
  const [absoluteMin, setAbsoluteMin] = useState(0);
  const [absoluteMax, setAbsoluteMax] = useState(0);
  const [minOfYear, setMinOfYear] = useState(0);
  const [maxOfYear, setMaxOfYear] = useState(0);

  const [heatMapYear, setHeatMapYear] = useState(2020);
  const [fields, setDataFields] = useState<Array<DataField>>([]);

  // Parse through data
  useEffect(() => {
    // Check if file was read
    if (!data || !data.data) {
      alert("Unable to retrieve data.");
    }

    const dateField: DataField = data.schema.fields[0];
    const numberField: DataField = data.schema.fields[1];

    if (!dateField || !numberField) {
      alert("Unable to fetch data schema.");
      return;
    }

    if (!numberField.units) {
      alert("Unable to fetch unit type.");
      return;
    }

    const {
      allData,
      yearData,
      absoluteMax,
      absoluteMin,
      relativeMin,
      relativeMax,
    } = dataUtils.organizeData(data.data, heatMapYear);

    // Set all and relative data, maxes, and mins
    setDataFields([dateField, numberField]);
    setAllIntensities(allData);
    setIntensityOfYear(yearData);
    setAbsoluteMax(absoluteMax);
    setAbsoluteMin(absoluteMin);
    setMaxOfYear(relativeMax);
    setMinOfYear(relativeMin);
  }, [heatMapYear]);

  return (
    <div className="h-full flex flex-col">
      <div className="w-full h-full flex">
        <Sidebar />
        <div className="w-full h-full">
          <DashboardNavbar imageSrc={"/../public/profilePic.png"} />
          <div className="flex justify-center relative top-1/10">
            <GraphSelector
              isLineChart={true}
              showLineChart={showLineChart}
              setShowLineChart={setShowLineChart}
              setIsLoading={setIsLoading}
            />
            <GraphSelector
              isLineChart={false}
              showLineChart={showLineChart}
              setShowLineChart={setShowLineChart}
              setIsLoading={setIsLoading}
            />
          </div>
          <div className="mx-auto relative top-1.5/10">
            {isLoading && (
              <div className="absolute flex justify-center items-center bg-white w-full h-full z-10">
                <Image
                  width={300}
                  height={200}
                  src={"/../public/loadingGif.gif"}
                  alt={"Loading gif"}
                />
              </div>
            )}
            {showLineChart ? (
              <LineChart
                data={allIntensities}
                min={absoluteMin}
                max={absoluteMax}
                fields={fields}
                width={900}
                height={600}
                setIsLoading={setIsLoading}
              />
            ) : (
              <div className="flex flex-col items-center">
                <HeatMapControls
                  heatMapYear={heatMapYear}
                  setHeatMapYear={setHeatMapYear}
                  setIsLoading={setIsLoading}
                />
                <HeatMap
                  data={intensityOfYear}
                  min={minOfYear}
                  max={maxOfYear}
                  fields={fields}
                  width={900}
                  height={600}
                  setIsLoading={setIsLoading}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonIntensity;
