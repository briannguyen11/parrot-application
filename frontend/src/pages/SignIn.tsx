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
    console.log(user);
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
      ).then((cred) => {
        console.log(cred);
        return cred;
      });

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
      <div className="xs:w-[300px] w-full mt-16">
        <div className="flex flex-col space-y-4 px-6 sm:px-0 w-full items-center">
          {error && renderError()}
          <img
            src="../../icon.svg"
            alt="logo"
            className="w-10 h-10 object-cover select-none"
          />
          <h1 className="text-2xl sm:text-3xl font-semibold font-montserrat mt-8 text-center">
            Welcome to Parrot
          </h1>
          <form
            onSubmit={handleSignIn}
            className="w-full flex flex-col space-y-4 items-center"
          >
            <input
              type="text"
              name="email"
              value={email}
              placeholder="Email Address"
              className="text-sm border border-border rounded-sm text-s outline-none w-full p-2 font-montserrat"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              className="text-sm border border-border rounded-sm text- outline-none w-full p-2 font-montserrat"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              className="text-white bg-parrot-red w-full hover:bg-black"
              type="submit"
            >
              Sign In
            </Button>
            <div className="flex flex-col items-center sm:flex-row sm:gap-2">
              <p className="text-xs font-medium font-montserrat text-slate-400">
                Don't have an account?
              </p>
              <p
                className="text-xs font-medium font-montserrat text-parrot-red hover:cursor-pointer"
                onClick={() => navigate("/sign-up")}
              >
                Sign up
              </p>
            </div>
          </form>
          <div className="w-full flex flex-row gap-2 items-center">
            <hr className="border-t-1 border-slate-500 w-full" />
            <p className="text-sm font-semibold text-slate-500 font-montserrat">
              OR
            </p>
            <hr className="border-t-1 border-slate-600 w-full" />
          </div>

          <GoogleSignIn />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
