/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, EMAIL, REFRESH_TOKEN } from "@/constants";
import { useAuth } from "@/components/auth/AuthWrapper";

import api from "../api";

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const { loggedIn, setPfp } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login | Parrot";
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/users/auth/login/", loginFormData);
      const accessToken = res.data.data.firebase_access_token;
      const refreshToken = res.data.data.firebase_refresh_token;
      const email = res.data.data.user_data.email;

      // check if user email verified
      const decoded: { email_verified: boolean } = jwtDecode(accessToken);
      const verified: boolean = decoded.email_verified;

      if (verified) {
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
        localStorage.setItem(EMAIL, email);

        loggedIn();

        const profile = await api.get("/api/profiles/");
        if (profile.data.length !== 0) {
          // if user has profile, set pfp and go to home
          console.log(profile);
          setPfp(profile.data[0].profile_picture);
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
    <div className="w-full lg:grid xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <p
            onClick={() => navigate("/")}
            className="text-gray-600 underline hover:cursor-pointer w-16"
          >
            {"<-back"}
          </p>
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>

          <form className="grid gap-4" onSubmit={handleLogin}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={loginFormData.email}
                onChange={handleInputChange}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                value={loginFormData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <div
            className="mt-4 text-center text-sm hover:cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Don&apos;t have an account?{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
