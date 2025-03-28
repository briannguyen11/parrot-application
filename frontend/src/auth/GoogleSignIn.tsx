import { useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { UserAuth } from "@/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@/assets/icons/google-color-svgrepo-com.svg";

const GoogleSignIn = () => {
  const { user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const auth = getAuth();
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  useEffect(() => {
    if (user !== null) {
      if (user === undefined) {
        navigate("/onboard");
      } else {
        navigate("/");
      }
    }

    // eslint-disable-next-line
  }, [user]);

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
