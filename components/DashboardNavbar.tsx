import Image from "next/image";

interface DashboardNavbarProps {
  imageSrc: string;
}

const DashboardNavbar = ({ imageSrc }: DashboardNavbarProps) => {
  return (
    <div className="bg-white absolute top-0 h-16 border-b-2 w-full">
      <Image
        className="rounded-full cursor-pointer relative top-1/2 -translate-y-2/4 left-3/4"
        src={imageSrc}
        alt={"Verse logo"}
        width={"40"}
        height={"40"}
      />
    </div>
  );
};

export default DashboardNavbar;
