// AuthProvider.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ACCESS_TOKEN, ID, PFP } from "../constants";
import api from "@/api";

interface AuthContextType {
  isLoggedIn: boolean;
  loggedInId: string | null;
  loggedInPfp: string | null;
  loggedIn: () => void;
  loggedOut: () => void;
  setUserId: (userId: string | null) => void;
  setUserPfp: (pfpUrl: string | null) => void;
}

interface Props {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInId, setLoggedInId] = useState<string | null>(null);
  const [loggedInPfp, setLoggedInPfp] = useState<string | null>(null);

  useEffect(() => {

    api.get("/api/profiles/picture/").then((response) => {
      if (response.status === 200) {
        setUserPfp(response.data[0]['profile_picture']);
      }
    }
    );

    console.log("Auth provider mounted");
    const storedToken = localStorage.getItem(ACCESS_TOKEN);
    const storedId = localStorage.getItem(ID);
    const storedPfp = localStorage.getItem(PFP);
    if (storedToken) {
      setIsLoggedIn(true);
    }
    if (storedId) {
      setLoggedInId(storedId);
    }
    if (storedPfp) {
      setLoggedInPfp(storedPfp);
    }
  }, []);

  const loggedIn = () => {
    setIsLoggedIn(true);
  };

  const loggedOut = () => {
    setIsLoggedIn(false);
  };

  const setUserId = (userId: string | null) => {
    if (userId) {
      setLoggedInId(userId);
      localStorage.setItem(ID, userId);
    } else {
      setLoggedInId(null);
    }
  };

  const setUserPfp = (pfpUrl: string | null) => {
    if (pfpUrl) {
      setLoggedInPfp(pfpUrl);
      localStorage.setItem(PFP, pfpUrl);
    } else {
      setLoggedInPfp(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loggedInId,
        loggedInPfp,
        loggedIn,
        loggedOut,
        setUserId,
        setUserPfp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication context
const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
