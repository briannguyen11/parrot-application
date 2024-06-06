// AuthProvider.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ACCESS_TOKEN, USER_PFP } from "../constants";
import api from "@/api";

type User = {
  user: string | null;
  username: string | null;
  profile_picture: string | null;
};

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  setUserPfp: (pfp: string | null) => void;
}

interface Props {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: Props) => {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (cred) => {
      if (cred) {
        try {
          const token = await cred.getIdToken();
          localStorage.setItem(ACCESS_TOKEN, token);

          const res = await api.get("/api/profiles/mini/");
          setUser(res.data[0]);
        } catch (error: unknown) {
          console.error(error);
        }
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const setUserPfp = (newPfp: string | null) => {
    if (newPfp) {
      localStorage.setItem(USER_PFP, newPfp);
    }
    setUser((prevUser) => {
      if (prevUser === null) {
        return prevUser;
      }
      return {
        ...prevUser,
        profilePicture: newPfp,
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        setUserPfp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication context
const UserAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("UserAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, UserAuth };
