import { useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  getAuth,
  getRedirectResult,
  UserCredential,
} from "firebase/auth";
import { useAuth } from "@/auth/AuthWrapper";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants";
import { Button } from "@/components/ui/button";

import GoogleIcon from "@/assets/icons/google-color-svgrepo-com.svg";
import api from "../api";

const GoogleSignIn = () => {
  const [signedIn, setSignIn] = useState<boolean>(false);
  const { loggedIn, updatePfp } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const auth = getAuth();
      await signInWithRedirect(auth, new GoogleAuthProvider());
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const processCredentials = async (credential: UserCredential) => {
    if (credential && credential.user) {
      const idToken = await credential.user.getIdToken();
      const refreshToken = credential.user.refreshToken;

      const res = await api.post("/api/users/auth/google-sign-in/", {
        id_token: idToken,
      });
      console.log(res);
      sessionStorage.setItem(ACCESS_TOKEN, idToken);
      sessionStorage.setItem(REFRESH_TOKEN, refreshToken);

      loggedIn();

      if (res.status === 201) {
        navigate("/onboard");
      }

      if (res.status === 200) {
        const profile = await api.get("/api/profiles/");
        updatePfp(profile.data[0].profile_picture);
        navigate("/");
      }
    }
  };

  useEffect(() => {
    const processRedirectResult = async () => {
      try {
        const credentials = await getRedirectResult(getAuth());
        if (credentials) {
          setSignIn(true);
          processCredentials(credentials);
        }
      } catch (error) {
        console.error("Error processing redirect result:", error);
      }
    };
    processRedirectResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signedIn]);

  return (
    <Button
      className="border border-border border-black bg-white rounded-sm flex gap-2 w-full"
      onClick={() => handleGoogleSignIn()}
    >
      <img src={GoogleIcon} alt="GoogleIcon" className="w-5 h-5" />
      <p>Continue with Google</p>
    </Button>
  );
};

export default GoogleSignIn;
