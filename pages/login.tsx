import type { NextPage } from "next";
import Image from "next/image";

const Login: NextPage = () => {
  return (
    <div>
      <div className="bg-navbar flex justify-between items-center top-0 left-0 w-full py-4 px-12">
        <h2 className=" text-lg tracking-[.5em] font-semibold">verse</h2>
        <button className="bg-black rounded-lg text-white px-8 py-2">
          Sign Up
        </button>
      </div>
      <div className="">PLACEHOLDER</div>
    </div>
  );
};

export default Login;
