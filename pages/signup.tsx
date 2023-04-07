import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import LoginNavbar from "../components/LoginNavbar";
import router from "next/router";

const SignUp: NextPage = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showError, setShowError] = useState(false);

  // Focus on name when modal opens
  useEffect(() => {
    if (usernameRef && usernameRef.current) {
      usernameRef.current.focus();
    }
  }, [usernameRef]);

  const handleRegister = () => {
    const username = usernameRef!.current!.value;
    const password = passwordRef!.current!.value;

    if (username && password) {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/planning-and-procurement");
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <LoginNavbar isRegistration={true} />
      <div
        data-testid="link"
        className="m-auto flex flex-col items-center w-1/3 h-2/3"
      >
        <Image
          className="relative"
          data-testid="logo"
          src={"/../public/logo.png"}
          alt={"Verse logo"}
          width={"90"}
          height={"90"}
        />
        <div className="mt-4">
          <div>
            <label className="relative left-2 top-6">Username</label>
            <input
              className="h-12 outline-active w-full rounded-md bg-secondary-bg px-2 pt-4"
              data-testid="username"
              type="text"
              ref={usernameRef}
              placeholder="Enter your username or email"
            />
          </div>
          <div>
            <label className="relative left-2 top-6">Password</label>
            <input
              className="h-12 outline-active w-full rounded-md bg-secondary-bg px-2 pt-4"
              data-testid="password"
              type="password"
              ref={passwordRef}
              placeholder="Enter your password"
            />
          </div>
        </div>
        <button
          className="bg-black mt-4 rounded-lg w-1/2 text-white px-8 py-3"
          data-testid="signup-button"
          onClick={handleRegister}
        >
          Sign Up
        </button>

        {showError && (
          <p data-testid="error-message" className="text-red-600 mt-8">
            Please register with both a username and password.
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
