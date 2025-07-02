import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const ADMIN_EMAIL = "admin@gmail.com";

const Protected = ({ children, adminOnly = false }) => {
  const { user } = useAuth();

  const isAdmin =
    user &&
    user.email &&
    user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default Protected;
