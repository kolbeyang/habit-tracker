"use client";

import useLogin from "@/hooks/useLogin";
import { useState } from "react";
import LoginButton from "./LoginButton";
import LoginWithGoogle from "./LoginWithGoogle";
import Logo from "./Logo";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const { loginWith } = useLogin();

  const onLoginWithGoogleClick = async () => {
    loginWith("google");
  };

  return (
    <div className="size-full flex flex-col gap-[50px] justify-center items-center px-[16px] max-w-[400px]">
      <Logo />
      <div className="flex flex-col gap-2 w-full">
        <div className="rounded-[16px] bg-subtle-03 p-[6px] gap-[4px] flex">
          <LoginButton isActive={isSignUp} onClick={() => setIsSignUp(true)}>
            SIGN UP
          </LoginButton>
          <LoginButton isActive={!isSignUp} onClick={() => setIsSignUp(false)}>
            LOGIN
          </LoginButton>
        </div>
        <div className="rounded-[16px] bg-subtle-03 p-[6px] gap-[4px] flex flex-col">
          <LoginWithGoogle onClick={onLoginWithGoogleClick} />
        </div>
      </div>
    </div>
  );
};

export default Login;
