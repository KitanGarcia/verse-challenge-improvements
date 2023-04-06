import type { NextPage } from "next";
import { useState, useEffect } from "react";

import Sidebar from "../components/Sidebar";
import LineChart from "../components/LineChart";
import { IntensityData } from "../types/IntensityData";
import { DataField } from "../types/DataField";
import data from "../data/caiso_carbon_intensity.json";

const CarbonIntensity: NextPage = () => {
  const [intensities, setIntensities] = useState<Array<IntensityData>>([]);
  const [fields, setDataFields] = useState<Array<DataField>>([]);

  // Get data
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
        <div className="w-full h-full flex flex-col justify-center">
          <LineChart
            data={intensities}
            fields={fields}
            width={900}
            height={600}
          />
        </div>
      </div>
    </div>
  );
};

export default CarbonIntensity;
