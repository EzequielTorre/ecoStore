import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useSweetAlert } from "../context/SweetAlertContext";
import "../styles/FormStyles.css";

const Login = () => {
  const { login } = useAuth();
  const { showAlert } = useSweetAlert();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      showAlert({
        title: "Bienvenido",
        text: `¡Hola, ${email}!`,
        icon: "success",
        confirmButtonText: "Continuar",
      }).then(() => navigate("/cart"));
    } catch (error) {
      showAlert({
        title: "Error",
        text: "Usuario o contraseña incorrectos.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className="form-center-container">
      <div className="form-card">
        <h2 className="form-title">Iniciar Sesión</h2>
        <form onSubmit={handleLogin} className="form-styled">
          <div className="form-group">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              autoComplete="username"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              autoComplete="current-password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="form-btn">
            Ingresar
          </button>
        </form>
        <div className="text-center">
          <Link to="/register" className="form-alt-link">
            ¿No tienes una cuenta? Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
