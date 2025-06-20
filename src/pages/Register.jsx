import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useSweetAlert } from "../context/SweetAlertContext";
import "../styles/FormStyles.css";

const Register = () => {
  const { register } = useAuth();
  const { showAlert } = useSweetAlert();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      showAlert({
        title: "Registro exitoso",
        text: "¡Tu cuenta ha sido creada!",
        icon: "success",
        confirmButtonText: "Continuar",
      }).then(() => navigate("/"));
    } catch (error) {
      showAlert({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className="form-center-container">
      <div className="form-card">
        <h2 className="form-title">Crear cuenta</h2>
        <form onSubmit={handleRegister} className="form-styled">
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
            Registrarse
          </button>
        </form>
        <div className="text-center">
          <Link to="/login" className="form-alt-link">
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
