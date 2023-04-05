import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import router from "next/router";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      router.push("/planning");
    }
  }, [isLoggedIn]);

  return (
    <div className="h-full flex flex-col">
      <div className="w-full h-full">
        <Sidebar />
        <div className="w-full h-full bg-red-500"></div>
      </div>
    </div>
  );
};

export default Home;
