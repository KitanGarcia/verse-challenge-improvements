import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import router from "next/router";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import LoginNavbar from "../components/LoginNavbar";

const Home: NextPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /*
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn]);
  */

  return (
    <div className="h-full flex flex-col">
      <div>
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
