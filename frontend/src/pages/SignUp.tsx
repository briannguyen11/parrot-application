import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  sendEmailVerification,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { Button } from "@/components/ui/button";
import GoogleIcon from "@/assets/icons/google-color-svgrepo-com.svg";
import api from "../api";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const checkPassword = (password: string): string => {
    const errors: string[] = [];

    // Check if password is less than 8 characters
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }
    // Check if password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }
    // Check if password contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter.");
    }
    // Check if password contains at least one digit
    if (!/\d/.test(password)) {
      errors.push("Password must contain at least one digit.");
    }
    // Check if password contains at least one special character
    if (!/[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(password)) {
      errors.push("Password must contain at least one special character.");
    }
    if (errors.length > 0) {
      return errors.join("\n");
    }

    return "success";
  };

  const renderError = (error: string) => {
    if (error === "Firebase: Error (auth/email-already-in-use).") {
      alert("Account already exists.");
    }
  };
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const check = checkPassword(password);
    if (check === "success") {
      if (password === confirmPassword) {
        try {
          const auth = getAuth();

          // create user with email and password
          const credentials = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          // send email verification
          await sendEmailVerification(credentials.user);

          // Check if the user's email is already verified
          console.log(credentials.user.emailVerified);
          // Get ID token
          const idToken = await credentials.user.getIdToken();

          // Send ID token to backend API
          const res = await api.post("/api/users/auth/sign-up/", {
            id_token: idToken,
          });
          console.log(res);

          // Navigate to a new page
          navigate("/sign-in");
        } catch (error: unknown) {
          if (error instanceof Error) {
            renderError(error.message);
          }
        }
      } else {
        alert("Passwords do not match!");
        setPassword("");
        setConfirmPassword("");
      }
    } else {
      alert(check);
      setPassword("");
      setConfirmPassword("");
    }
  };

  useEffect(() => {
    document.title = "Sign Up | Parrot";
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
          <form
            onSubmit={handleSignUp}
            className="w-full flex flex-col space-y-4 items-center"
          >
            <input
              type="text"
              value={email}
              placeholder="Email Address"
              className="text-sm border border-border border-black rounded-sm text-sm outline-none w-full p-2"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              className="text-sm border border-border border-black rounded-sm text-sm outline-none w-full p-2"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              className="text-sm border border-border border-black rounded-sm text-sm outline-none w-full p-2"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button type="submit" className="text-white bg-parrotRed w-full">
              Create Account
            </Button>
          </form>
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
