import type { NextPage } from "next";
import { useState, useEffect } from "react";

import Sidebar from "../components/Sidebar";
import LineChart from "../components/LineChart";
import { IntensityData } from "../types/IntensityData";
import { DataField } from "../types/DataField";
import data from "../data/caiso_carbon_intensity.json";
import GraphSelector from "../components/GraphSelector";
import HeatMap from "../components/HeatMap";
import DashboardNavbar from "../components/DashboardNavbar";

import * as dataUtils from "../utils/data";
import * as d3 from "d3";

const CarbonIntensity: NextPage = () => {
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

    let intensityData: IntensityData[] = data.data;

    // Filter out falsy values and incorrect types and remove duplicates
    intensityData = dataUtils.cleanData(intensityData);
    intensityData = dataUtils.removeDuplicates(intensityData);

    setDataFields([dateField, numberField]);
    setAllIntensities(intensityData);

    // Get data pertaining only to selected year
    let yearsIntensityData = dataUtils.filterYear(intensityData, heatMapYear);
    setIntensityOfYear(yearsIntensityData);

    // Get max and min for all data and for specific year
    const [min, max] = d3.extent(intensityData.map((d) => d.carbon_intensity));
    const [relativeMin, relativeMax] = d3.extent(
      yearsIntensityData.map((d) => d.carbon_intensity)
    );

    setAbsoluteMax(max as number);
    setAbsoluteMin(min as number);
    setMaxOfYear(relativeMax as number);
    setMinOfYear(relativeMin as number);
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
            />
            <GraphSelector
              isLineChart={false}
              showLineChart={showLineChart}
              setShowLineChart={setShowLineChart}
            />
          </div>
          <div className="mx-auto relative top-1.5/10">
            {showLineChart ? (
              <LineChart
                data={allIntensities}
                min={absoluteMin}
                max={absoluteMax}
                fields={fields}
                width={900}
                height={600}
              />
            ) : (
              <div className="flex flex-col items-center">
                <HeatMap
                  data={intensityOfYear}
                  min={minOfYear}
                  max={maxOfYear}
                  fields={fields}
                  width={900}
                  height={600}
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
