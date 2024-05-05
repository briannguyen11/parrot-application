import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
// import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

interface RegisterFormData {
  email: string;
  password: string;
}

export function Register() {
  const [registerFormData, setRegisterFormData] = useState<RegisterFormData>({
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterFormData({ ...registerFormData, [name]: value });
  };

  const handleRegsiter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (registerFormData.password === confirmPassword) {
      try {
        const res = await api.post(
          "/api/users/auth/register/",
          registerFormData
        );
        console.log(res);
        alert("A verification email has been sent to you!");
        navigate("/login");
      } catch (error) {
        alert(error);
      }
    } else {
      alert("Passwords do not match!");
      setRegisterFormData({
        email: "",
        password: "",
      });
      setConfirmPassword("");
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
            <h1 className="text-3xl font-bold">Register</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email and password to create your account
            </p>
          </div>

          <form className="grid gap-4" onSubmit={handleRegsiter}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={registerFormData.email}
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
                value={registerFormData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="confirm-password">Confirm Password</Label>
              </div>
              <Input
                id="confirm-password"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(e.target.value)
                }
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
          <div
            className="mt-4 text-center text-sm hover:cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Already have an account?{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
