import router from "next/router";

const Sidebar = () => {
  return (
    <div className="w-[18rem] flex flex-col items-center absolute top-0 bottom-0 h-full bg-nav-bg border-r-2">
      <h2 className="text-lg w-full text-center border-b-2 py-4 tracking-[.5em] font-semibold">
        verse
      </h2>
      <ul className="p-4 w-full text-center">
        <li
          className="mb-4 border-2 hover:bg-active h-[60px] flex justify-center items-center cursor-pointer"
          onClick={() => console.log("Clicked")}
        >
          Planning & Procurement
        </li>
        <li
          className="mb-4 border-2 hover:bg-active h-[60px] flex justify-center items-center cursor-pointer"
          onClick={() => console.log("Clicked")}
        >
          Delivery
        </li>
        <li
          className="mb-4 border-2 hover:bg-active h-[60px] flex justify-center items-center cursor-pointer"
          onClick={() => console.log("Clicked")}
        >
          Optimization
        </li>
        <li
          className="mb-4 border-2 hover:bg-active h-[60px] flex justify-center items-center cursor-pointer"
          onClick={() => console.log("Clicked")}
        >
          Monitoring & Reporting
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
