import type { NextPage } from "next";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import PlanningTile from "../components/PlanningTile";

const PlanningAndProcurement: NextPage = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="w-full h-full flex">
        <Sidebar />
        <div className="w-full h-full flex flex-col justify-center">
          <DashboardNavbar imageSrc={"/../public/profilePic.png"} />
          <div className="relative top-4">
            <h2 className="my-6 text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </h2>
            <div className="flex mb-8 justify-center">
              <PlanningTile
                imageSrc={"/../public/placeholder.png"}
                title={"Goal Setting & Portfolio Design"}
                buttonText={"Set up"}
                enabled={false}
                route={""}
                testId={"tile1"}
              />
              <PlanningTile
                imageSrc={"/../public/placeholder.png"}
                title={"RFO Administration"}
                buttonText={"Set up"}
                enabled={false}
                route={""}
                testId={"tile2"}
              />
            </div>
            <div className="flex justify-center">
              <PlanningTile
                imageSrc={"/../public/placeholder.png"}
                title={"Commercial Structuring"}
                buttonText={"Set up"}
                enabled={false}
                route={""}
                testId={"tile3"}
              />
              <PlanningTile
                imageSrc={"/../public/placeholder.png"}
                title={"Carbon Intensity"}
                buttonText={"Set up"}
                enabled={true}
                route={"/carbon-intensity"}
                testId={"carbon-intensity"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanningAndProcurement;
