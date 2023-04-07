import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import LoginNavbar from "../components/LoginNavbar";
import router from "next/router";

const Login: NextPage = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const rememberMeRef = useRef<HTMLInputElement>(null);
  const [showError, setShowError] = useState(false);

  // Focus on name when modal opens
  useEffect(() => {
    if (usernameRef && usernameRef.current) {
      usernameRef.current.focus();
    }
  }, [usernameRef]);

  const handleLogin = () => {
    const username = usernameRef!.current!.value;
    const password = passwordRef!.current!.value;

    if (username && password) {
      // store a cookie (loggedIn: True)
      // route to /
      localStorage.setItem("isLoggedIn", "true");
      router.push("/planning-and-procurement");
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <LoginNavbar isRegistration={false} />
      <div className="m-auto flex flex-col items-center w-1/3 h-2/3">
        <a data-testid="link" href="https://verse.inc">
          <Image
            data-testid="logo"
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
              data-testid="username"
              name="username"
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
              name="password"
              type="password"
              ref={passwordRef}
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label className="text-secondary-text cursor-pointer">
              <input
                className="mr-2 mt-4 cursor-pointer"
                data-testid="remember-me"
                type="checkbox"
                ref={rememberMeRef}
              />
              Remember me
            </label>
          </div>
        </div>
        <button
          className="bg-black mt-4 rounded-lg w-1/2 text-white px-8 py-3"
          data-testid="login-button"
          onClick={handleLogin}
        >
          Log in
        </button>
        <p className="mt-4 text-secondary-text cursor-pointer">
          Forgot password?
        </p>
        {showError && (
          <p data-testid="error-message" className="text-red-600 mt-8">
            Please enter a correct username and password.
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
