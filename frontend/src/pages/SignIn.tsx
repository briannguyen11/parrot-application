/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, EMAIL, REFRESH_TOKEN } from "@/constants";
import { useAuth } from "@/auth/AuthWrapper";
import { Button } from "@/components/ui/button";

import GoogleIcon from "@/assets/icons/google-color-svgrepo-com.svg";
import api from "../api";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { loggedIn, updatePfp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login | Parrot";
  }, []);

  const handleSignIn = async () => {
    try {
      const res = await api.post("/api/users/auth/login/", {
        email: email,
        password: password,
      });
      const accessToken = res.data.data.firebase_access_token;
      const refreshToken = res.data.data.firebase_refresh_token;

      // check if user email verified
      const decoded: { email_verified: boolean } = jwtDecode(accessToken);
      const verified: boolean = decoded.email_verified;

      if (verified) {
        sessionStorage.setItem(ACCESS_TOKEN, accessToken);
        sessionStorage.setItem(REFRESH_TOKEN, refreshToken);
        sessionStorage.setItem(EMAIL, email);

        loggedIn();
        setEmail("");
        setPassword("");

        const profile = await api.get("/api/profiles/");
        if (profile.data.length !== 0) {
          // if user has profile, set pfp and go to home
          updatePfp(profile.data[0].profile_picture);
          navigate("/");
        } else {
          // no profile, go to onboard
          navigate("/onboard");
        }
      } else {
        alert("Email not verified yet!");
        navigate("/");
      }
    } catch (error: any) {
      const errorMessage: string = error.response.data.message;
      alert(errorMessage);
    }
  };
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="sm:w-[400px] w-full m-8 flex flex-col items-center">
        <img
          src="../../icon.svg"
          alt="logo"
          className="w-12 h-12 object-cover select-none"
        />
        <h1 className="text-2xl font-semibold mt-2 text-center">
          Greetings from Parrot!
        </h1>
        <div className="border border-1 border-black rounded-sm mt-4 flex flex-col space-y-4 p-4 w-full items-center">
          <div className="flex flex-inline gap-4">
            <p className="text-sm font-medium underline underline-offset-4 hover:cursor-pointer">
              Sign In
            </p>
            <p
              className="text-sm font-medium hover:underline underline-offset-4 hover:cursor-pointer"
              onClick={() => navigate("/sign-up")}
            >
              Sign Up
            </p>
          </div>
          <input
            type="text"
            value={email}
            placeholder="Email Address"
            className="text-sm border border-border border-black rounded-sm textsm outline-none w-full p-2"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            className="text-sm border border-border border-black rounded-sm textsm outline-none w-full p-2"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className="text-white bg-parrotRed w-full"
            onClick={() => handleSignIn()}
          >
            Login
          </Button>
          <p className="text-sm font-semibold">Or</p>
          <Button className="border border-border border-black bg-white rounded-sm flex gap-2 w-full">
            <img src={GoogleIcon} alt="GoogleIcon" className="w-5 h-5" />
            <p>Continue with Google</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
