import { useState, useEffect } from "react";
import { UserAuth } from "@/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "@/components/ui/button";

import GoogleSignIn from "@/auth/GoogleSignIn";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { user } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sign In | parrot";
    if (user !== null) {
      if (user === undefined) {
        navigate("/onboard");
      } else {
        navigate("/");
      }
    }
  }, [user]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!credentials.user.emailVerified) {
        setError("Please verify email before signing in.");
        return;
      }

      setEmail("");
      setPassword("");
    } catch (error: unknown) {
      console.error(error);
      setEmail("");
      setPassword("");
      setError("Invalid email or password.");
    }
  };

  const renderError = () => {
    setTimeout(() => {
      setError(null);
    }, 3000);

    return (
      <div className="flex flex-inline gap-2 items-center border border-1 border-parrot-yellow p-2 rounded-sm mb-4">
        <p className="w-4 h-4 bg-parrot-yellow rounded-full text-xs text-center text-white font-bold">
          !
        </p>
        <p className="text-sm font-normal text-parrot-yellow">{error}</p>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="sm:w-[400px] w-full m-8 flex flex-col items-center">
        {error && renderError()}
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
          <form
            onSubmit={handleSignIn}
            className="w-full flex flex-col space-y-4 items-center"
          >
            <input
              type="text"
              name="email"
              value={email}
              placeholder="Email Address"
              className="text-sm border border-border border-black rounded-sm textsm outline-none w-full p-2"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              className="text-sm border border-border border-black rounded-sm textsm outline-none w-full p-2"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              className="text-white bg-parrot-red w-full hover:bg-black"
              type="submit"
            >
              Sign In
            </Button>
          </form>
          <p className="text-sm font-semibold">Or</p>
          <GoogleSignIn />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
