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

const CarbonIntensity: NextPage = () => {
  const [showLineChart, setShowLineChart] = useState(true);
  const [heatMapYear, setHeatMapYear] = useState(2019);
  const [intensities, setIntensities] = useState<Array<IntensityData>>([]);
  const [fields, setDataFields] = useState<Array<DataField>>([]);

  // Parse through data
  useEffect(() => {
    // Check if file was read
    if (!data) {
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

    console.log(data.schema.fields[0]);
    console.log(data.schema.fields[1]);
    setDataFields([dateField, numberField]);
    setIntensities(data.data as IntensityData[]);
  }, []);

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
                data={intensities}
                fields={fields}
                width={900}
                height={600}
              />
            ) : (
              <div className="flex flex-col items-center">
                <HeatMap
                  data={intensities}
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
