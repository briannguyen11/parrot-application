// AuthProvider.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN, ID, PFP } from "../constants";
import api from "@/api";
import { jwtDecode } from "jwt-decode";


interface AuthContextType {
  isLoggedIn: boolean;
  isAuthorized: boolean | null; 
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
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  //refresh token
  useEffect(() => {
    // if any erros in auth(), set to false

    auth().catch(() => {
      console.log("No token found");
      setIsAuthorized(false)});


  }, []);

  // request new token from backend
  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/api/users/auth/refresh-token/", {
        refresh_token: refreshToken,
      });
      if (res.status === 200) {
        const { idToken, refreshToken } = res.data.access_token;
        localStorage.setItem(ACCESS_TOKEN, idToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  // check is token is still valid
  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000; // seconds

    if (tokenExpiration && tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };

  useEffect(() => {

    api.get("/api/profiles/picture/").then((response) => {
      if (response.status === 200) {
        setUserPfp(response.data[0]['profile_picture']);
      }
      else{
        console.log("Error fetching profile picture");
      }
    }
    );

    console.log("Auth provider mounted");
    const storedToken = localStorage.getItem(ACCESS_TOKEN);
    const storedId = localStorage.getItem(ID);

    if (storedToken) {
      setIsLoggedIn(true);
    }
    if (storedId) {
      setLoggedInId(storedId);
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
        isAuthorized,
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
