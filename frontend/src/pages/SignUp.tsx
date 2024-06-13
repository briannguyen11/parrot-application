import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { Button } from "@/components/ui/button";
import GoogleSignIn from "@/auth/GoogleSignIn";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [popup, setPopup] = useState<boolean>(false);
  const [credential, setCredential] = useState<UserCredential>();
  const [resend, setResend] = useState<boolean>(false);

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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const check = checkPassword(password);
    if (check === "success") {
      if (password === confirmPassword) {
        try {
          const auth = getAuth();

          const cred = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          await sendEmailVerification(cred.user);

          setCredential(cred);
          setPopup(true);

          setEmail("");
          setPassword("");
          setConfirmPassword("");
        } catch (error: unknown) {
          if (error instanceof Error) {
            setError(error.message);
          }
        }
      } else {
        setError("Passwords do not match!");
        setPassword("");
        setConfirmPassword("");
      }
    } else {
      setError(check);
      setPassword("");
      setConfirmPassword("");
    }
  };

  useEffect(() => {
    document.title = "Sign Up | Parrot";
  }, []);

  const renderError = () => {
    setTimeout(() => {
      setError(null);
    }, 5000);
    let message = error;
    if (error === "Firebase: Error (auth/email-already-in-use).") {
      message = "Account already exists.";
    }
    return (
      <div className="flex flex-inline gap-2 items-center border border-1 border-parrot-yellow p-2 rounded-sm mb-4">
        <p className="w-4 h-4 bg-parrot-yellow rounded-full text-xs text-center text-white font-bold">
          !
        </p>
        <p className="text-xs font-normal text-parrot-yellow">
          {message &&
            message.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
        </p>
      </div>
    );
  };

  const resendLink = async () => {
    setTimeout(() => {
      setResend(false);
    }, 5000);
    if (!credential || !credential.user) return;
    try {
      await sendEmailVerification(credential.user);
      setResend(true);
    } catch (error) {
      setError("Failed to send verification email. Please try again.");
    }
  };

  const renderEmailPopup = () => {
    return (
      <div className="flex flex-col space-y-2 items-center bg-parrot-blue px-4 py-2  rounded-sm mb-4">
        <p className="text-sm font-semibold text-white">Verify Your Email</p>
        <p className="text-xs font-normal text-white">
          A link has been sent to verify your email.
        </p>
        {credential && !resend ? (
          <button
            className="text-xs text-white font-normal underline underline-offset-4 hover:underline"
            onClick={resendLink}
          >
            Resend link
          </button>
        ) : (
          <p className="text-xs font-semibold text-parrot-green">Link sent!</p>
        )}
        <button
          className="bg-black text white px-2 py-2 text-xs text-white w-full rounded-sm"
          onClick={() => navigate("/sign-in")}
        >
          Go to Sign In
        </button>
      </div>
    );
  };

  return (
    <div className="w-full h-screen flex justify-center relative">
      <div className="2xs:w-[350px] w-full absolute top-40">
        <div className="flex flex-col space-y-4 p-6 w-full items-center">
          {popup && renderEmailPopup()}
          {error && renderError()}
          <img
            src="../../icon.svg"
            alt="logo"
            className="w-10 h-10 object-cover select-none"
          />
          <div className="flex flex-col space-y-2">
            <h1 className="text-2xl xs:text-3xl font-semibold font-montserrat text-center">
              Create an account
            </h1>
            <p className="text-xs font-medium text-center text-slate-400 font-montserrat">
              Please note that email verification is required upon sign up.
            </p>
          </div>

          <form
            onSubmit={handleSignUp}
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
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm Password"
              className="text-sm border border-border rounded-sm outline-none w-full p-2 font-montserrat"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button
              className="text-white bg-parrot-red w-full hover:bg-red-600"
              type="submit"
            >
              Sign Up
            </Button>
            <div className="flex flex-col items-center xs:flex-row xs:gap-2">
              <p className="text-xs font-medium font-montserrat text-slate-400">
                Already have an account?
              </p>
              <p
                className="text-xs font-medium font-montserrat text-parrot-red hover:cursor-pointer"
                onClick={() => navigate("/sign-in")}
              >
                Sign in
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

export default SignUp;
