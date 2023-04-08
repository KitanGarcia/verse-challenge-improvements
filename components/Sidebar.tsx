import router from "next/router";

const Sidebar = () => {
  return (
    <div className="w-[20rem] z-10 flex flex-col items-center top-0 bottom-0 h-full bg-nav-bg border-r-2">
      <h2 className="text-lg w-full h-16 text-center border-b-2 py-4 tracking-[.5em] font-semibold">
        <a href="https://verse.inc">verse</a>
      </h2>
      <ul className="p-4 w-full text-center">
        <li
          className="mb-4 border-2 hover:bg-active h-[60px] flex justify-center items-center cursor-pointer"
          onClick={() => router.push("/planning-and-procurement")}
        >
          Planning & Procurement
        </li>
        <li
          className="mb-4 border-2 h-[60px] flex justify-center items-center"
          onClick={() => alert("Feature disabled")}
        >
          Delivery
        </li>
        <li
          className="mb-4 border-2 h-[60px] flex justify-center items-center"
          onClick={() => alert("Feature disabled")}
        >
          Optimization
        </li>
        <li
          className="mb-4 border-2 h-[60px] flex justify-center items-center"
          onClick={() => alert("Feature disabled")}
        >
          Monitoring & Reporting
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
