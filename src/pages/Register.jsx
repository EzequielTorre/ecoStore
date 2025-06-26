import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useSweetAlert } from "../context/SweetAlertContext";
import { FcGoogle } from "react-icons/fc";
import "../styles/FormStyles.css";

const Register = () => {
  const { register, loginWithGoogle } = useAuth();
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
          <button
            type="button"
            className="form-btn"
            style={{
              background: "#fff",
              color: "#444",
              border: "1px solid #d1d5db",
              marginTop: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
            onClick={async () => {
              try {
                await loginWithGoogle();
                showAlert({
                  title: "¡Bienvenido!",
                  text: "Has iniciado sesión con Google.",
                  icon: "success",
                  confirmButtonText: "Continuar",
                }).then(() => navigate("/"));
              } catch (error) {
                showAlert({
                  title: "Error",
                  text: "No se pudo iniciar sesión con Google.",
                  icon: "error",
                  confirmButtonText: "Aceptar",
                });
              }
            }}
          >
            <FcGoogle style={{ fontSize: "1.5rem" }} />
            Loguéate con tu Gmail
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
