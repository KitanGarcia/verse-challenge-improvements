import type { NextPage } from "next";
import Sidebar from "../components/Sidebar";
import PlanningTile from "../components/PlanningTile";

const PlanningAndProcurement: NextPage = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="w-full h-full flex">
        <Sidebar />
        <div className="w-full h-full flex flex-col justify-center">
          <h2 className="mb-8 text-center">
            Lorem ipsum, this is placeholder text
          </h2>
          <div className="flex mb-4 justify-center">
            <PlanningTile
              imageSrc={"/../public/placeholder.png"}
              title={"Goal Setting & Portfolio Design"}
              buttonText={"Set up"}
              enabled={false}
              route={""}
            />
            <PlanningTile
              imageSrc={"/../public/placeholder.png"}
              title={"RFO Administration"}
              buttonText={"Set up"}
              enabled={false}
              route={""}
            />
          </div>
          <div className="flex mt-4 justify-center">
            <PlanningTile
              imageSrc={"/../public/placeholder.png"}
              title={"Commercial Structuring"}
              buttonText={"Set up"}
              enabled={false}
              route={""}
            />
            <PlanningTile
              imageSrc={"/../public/placeholder.png"}
              title={"Energy Supply Portfolio Construction"}
              buttonText={"Set up"}
              enabled={true}
              route={"carbonintensity"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanningAndProcurement;
