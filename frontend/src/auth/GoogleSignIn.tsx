import { Button } from "@/components/ui/button";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

import GoogleIcon from "@/assets/icons/google-color-svgrepo-com.svg";
// import api from "../api";

const GoogleSignIn = () => {
  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const accessToken = await result.user.getIdToken();
      const refreshToken = result.user.refreshToken;
      console.log(accessToken);
      console.log(refreshToken);

      // Send ID token to your backend
      //  const response = await axios.post("/google-signin", { idToken });

      //  console.log(response.data);

      // Handle response from backend
    } catch (error: unknown) {
      console.error(error);
    }
  };

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
