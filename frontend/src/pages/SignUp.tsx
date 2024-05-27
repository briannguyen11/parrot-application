import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EMAIL } from "@/constants";

import GoogleIcon from "@/assets/icons/google-color-svgrepo-com.svg";
import api from "../api";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password === confirmPassword) {
      try {
        const res = await api.post("/api/users/auth/register/", {
          email: email,
          password: password,
        });
        sessionStorage.setItem(EMAIL, res.data.data.email);
        navigate("/wait");
      } catch (error) {
        alert(error);
      }
    } else {
      alert("Passwords do not match!");
      setPassword("");
      setConfirmPassword("");
    }
  };

  useEffect(() => {
    document.title = "Register | Parrot";
  }, []);

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
            <p
              className="text-sm font-medium hover:underline underline-offset-4 hover:cursor-pointer"
              onClick={() => navigate("/sign-in")}
            >
              Sign In
            </p>
            <p className="text-sm font-medium  underline underline-offset-4 hover:cursor-pointer">
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
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            className="text-sm border border-border border-black rounded-sm textsm outline-none w-full p-2"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className="text-white bg-parrotRed w-full"
            onClick={() => handleSignUp()}
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

export default SignUp;
