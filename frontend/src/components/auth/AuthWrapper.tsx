// AuthProvider.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ACCESS_TOKEN } from "../../constants";

interface AuthContextType {
  isLoggedIn: boolean;
  pfp: string | null;
  loggedIn: () => void;
  loggedOut: () => void;
  setPfp: React.Dispatch<React.SetStateAction<string | null>>;
}

interface Props {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pfp, setPfp] = useState<string | null>(null);

  useEffect(() => {
    // const fetchUser = async () => {
    //   try {
    //     const res = await api.get("api/profiles/");
    //     const data = {
    //       firstName: res.data[0].first_name,
    //       lastName: res.data[0].last_name_name,
    //       pfp: res.data[0].profile_picture,
    //     };
    //     setUser(data);
    //   } catch (error: any) {
    //     console.error(error.response);
    //   }
    // };

    const storedToken = localStorage.getItem(ACCESS_TOKEN);
    if (storedToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const loggedIn = () => {
    setIsLoggedIn(true);
  };

  const loggedOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        pfp,
        loggedIn,
        loggedOut,
        setPfp,
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
