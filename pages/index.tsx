import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import router from "next/router";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      router.push("/login");
    } else {
      router.push("/planning-and-procurement");
    }
  }, []);

  return <div className="h-full flex flex-col"></div>;
};

export default Home;
