// ProtectedRoute.tsx

import { Navigate } from "react-router-dom";
import { UserAuth } from "./AuthContext";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { user } = UserAuth();

  return user !== null ? children : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
