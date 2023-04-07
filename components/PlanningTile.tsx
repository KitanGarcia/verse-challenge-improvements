import router from "next/router";
import Image from "next/image";

interface PlanningTileProps {
  imageSrc: string;
  title: string;
  buttonText: string;
  enabled: boolean;
  route: string;
}

const PlanningTile = ({
  imageSrc,
  title,
  buttonText,
  enabled,
  route,
}: PlanningTileProps) => {
  return (
    <div
      className={`${
        enabled ? "hover:bg-active" : ""
      } w-[22rem] text-xl h-[24rem] mx-4 flex flex-col justify-around items-center bg-secondary-bg rounded-lg`}
    >
      <Image src={imageSrc} alt={"Verse logo"} width={"120"} height={"90"} />
      <h1 className="text-center">{title}</h1>
      <button
        className={`rounded-full outline-none px-16 py-2 ${
          enabled ? "bg-black" : "bg-disabled"
        }
        ${enabled ? "text-white" : "text-black"}
        ${enabled ? "cursor-pointer" : "cursor-default"}
        `}
        onClick={
          route ? () => router.push(route) : () => alert("Feature disabled")
        }
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PlanningTile;
