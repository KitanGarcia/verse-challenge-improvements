import type { NextPage } from "next";
import Sidebar from "../components/Sidebar";

const CarbonIntensity: NextPage = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="w-full h-full flex">
        <Sidebar />
        <div className="w-full h-full flex flex-col justify-center">
          <h2 className="mb-8 text-center">
            Lorem ipsum, this is placeholder text
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CarbonIntensity;
