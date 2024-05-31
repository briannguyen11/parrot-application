import { useEffect } from "react";
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
  const { loggedIn, setUserId, setUserPfp } = useAuth();
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
      sessionStorage.setItem(ACCESS_TOKEN, idToken);
      sessionStorage.setItem(REFRESH_TOKEN, refreshToken);

      loggedIn();
      setUserId(res.data.user_data.id);

      if (res.status === 201) {
        navigate("/onboard");
      }

      if (res.status === 200) {
        const profile = await api.get("/api/profiles/");
        setUserPfp(profile.data[0].profile_picture);
        navigate("/");
      }
    }
  };

  useEffect(() => {
    const processRedirectResult = async () => {
      try {
        const credentials = await getRedirectResult(getAuth());
        if (credentials) {
          processCredentials(credentials);
        }
      } catch (error) {
        console.error("Error processing redirect result:", error);
      }
    };
    processRedirectResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

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
