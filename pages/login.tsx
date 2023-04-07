import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useRef } from "react";

import LoginNavbar from "../components/LoginNavbar";

const Login: NextPage = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const rememberMeRef = useRef<HTMLInputElement>(null);

  // Focus on name when modal opens
  useEffect(() => {
    if (usernameRef && usernameRef.current) {
      usernameRef.current.focus();
    }
  }, [usernameRef]);

  return (
    <div className="h-full flex flex-col">
      <LoginNavbar isRegistration={false} />
      <div className="m-auto flex flex-col items-center w-1/3 h-2/3">
        <a href="https://verse.inc">
          <Image
            className="relative"
            src={"/../public/logo.png"}
            alt={"Verse logo"}
            width={"90"}
            height={"90"}
          />
        </a>
        <div className="mt-4">
          <div>
            <label className="relative left-2 top-6">Username</label>
            <input
              className="h-12 outline-active w-full rounded-md bg-secondary-bg px-2 pt-4"
              type="text"
              ref={usernameRef}
              placeholder="Enter your username or email"
            />
          </div>
          <div>
            <label className="relative left-2 top-6">Password</label>
            <input
              className="h-12 outline-active w-full rounded-md bg-secondary-bg px-2 pt-4"
              type="password"
              ref={passwordRef}
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label className="text-secondary-text cursor-pointer">
              <input
                className="mr-2 mt-4 cursor-pointer"
                type="checkbox"
                ref={rememberMeRef}
              />
              Remember me
            </label>
          </div>
        </div>
        <button className="bg-black mt-4 rounded-lg w-1/2 text-white px-8 py-3">
          Log in
        </button>
        <p className="mt-4 text-secondary-text cursor-pointer">
          Forgot password?
        </p>
      </div>
    </div>
  );
};

export default Login;
