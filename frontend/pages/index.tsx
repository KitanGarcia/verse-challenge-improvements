import type { NextPage } from "next";
import router from "next/router";
import { useEffect } from "react";

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
