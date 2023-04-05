import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import router from "next/router";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn]);

  return <></>;
};

export default Home;
