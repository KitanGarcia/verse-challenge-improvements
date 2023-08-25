import Image from "next/image";

interface DashboardNavbarProps {
  imageSrc: string;
}

const DashboardNavbar = ({ imageSrc }: DashboardNavbarProps) => {
  return (
    <div
      data-testid="dashboard-navbar"
      className="bg-white absolute top-0 h-16 border-b-2 w-full right-0"
    >
      <Image
        data-testid="profile-picture"
        className="rounded-full cursor-pointer relative top-1/2 -translate-y-2/4 left-9/10"
        src={imageSrc}
        alt={"Verse logo"}
        width={"40"}
        height={"40"}
      />
    </div>
  );
};

export default DashboardNavbar;
