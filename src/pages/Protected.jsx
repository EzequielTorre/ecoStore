import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Cambia este email por el de tu admin real
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

  // Si la ruta es solo para admin y el usuario no es admin, redirige al inicio
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default Protected;
