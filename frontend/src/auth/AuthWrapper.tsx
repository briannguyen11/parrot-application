// AuthProvider.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ACCESS_TOKEN, PFP } from "../constants";

interface AuthContextType {
  isLoggedIn: boolean;
  pfp: string | null;
  loggedIn: () => void;
  loggedOut: () => void;
  updatePfp: (pfpUrl: string | null) => void;
}

interface Props {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pfp, setPfp] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem(ACCESS_TOKEN);
    const storedPfp = sessionStorage.getItem(PFP);
    if (storedToken) {
      setIsLoggedIn(true);
    }
    if (storedPfp) {
      setPfp(storedPfp);
    }
  }, []);

  const loggedIn = () => {
    setIsLoggedIn(true);
  };

  const loggedOut = () => {
    setIsLoggedIn(false);
  };

  const updatePfp = (pfpUrl: string | null) => {
    if (pfpUrl) {
      setPfp(pfpUrl);
      sessionStorage.setItem(PFP, pfpUrl);
    } else {
      setPfp(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        pfp,
        loggedIn,
        loggedOut,
        updatePfp,
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
