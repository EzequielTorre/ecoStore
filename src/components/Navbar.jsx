import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import {
  FaShoppingCart,
  FaHome,
  FaThList,
  FaSignOutAlt,
  FaEnvelope,
  FaBars,
  FaPlus,
} from "react-icons/fa";
import { MdOutlineEco } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";

// Mi Navbar donde se muestra el logo, enlaces a las diferentes páginas, carrito de compras y un menú desplegable para el admin si el usuario es admin.
const Navbar = ({ onLogout }) => {
  const { cart } = useCart();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const adminMenuRef = useRef();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Verifica si el usuario es admin comparando su email con un email predefinido.
  const ADMIN_EMAIL = "admin@gmail.com";
  const isAdmin =
    user &&
    user.email &&
    user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        adminMenuRef.current &&
        !adminMenuRef.current.contains(event.target)
      ) {
        setAdminMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar" aria-label="Navegación principal">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <MdOutlineEco />
          ecoTienda
        </Link>

        
        <button className="navbar-toggle" onClick={toggleMenu}>
          <FaBars style={{ color: "white", fontSize: "1.5rem" }} />
        </button>

        <Link
          to="/cart"
          className="navbar-cart-icon"
          style={{ marginLeft: "1rem" }}
        >
          <FaShoppingCart style={{ color: "white", fontSize: "1.5rem" }} />
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </Link>

        <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <Link
            to="/"
            className="navbar-link"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaHome /> Inicio
          </Link>
          <Link
            to="/category"
            className="navbar-link"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaThList /> Categorías
          </Link>
          <Link
            to="/cart"
            className="navbar-link"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaShoppingCart /> Carrito
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
          <Link
            to="/contact"
            className="navbar-link"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaEnvelope style={{ marginRight: 6 }} />
            Contacto
          </Link>
          
          {isAdmin && (
            <div
              style={{
                position: "relative",
                width: isMenuOpen ? "100%" : "auto",
              }}
              ref={adminMenuRef}
            >
              <button
                className="navbar-link"
                style={{
                  width: isMenuOpen ? "100%" : "auto",
                  textAlign: isMenuOpen ? "left" : "inherit",
                }}
                onClick={() => setAdminMenuOpen((open) => !open)}
                type="button"
              >
                <RiAdminFill style={{ marginRight: 6, color: "red" }} />
                Admin
              </button>
              {adminMenuOpen && (
                <div
                  style={{
                    position: isMenuOpen ? "static" : "absolute",
                    top: isMenuOpen ? "auto" : "100%",
                    left: 0,
                    background: "#2c3e50",
                    borderRadius: 6,
                    boxShadow: isMenuOpen
                      ? "none"
                      : "0 2px 8px rgba(0,0,0,0.15)",
                    zIndex: 100,
                    minWidth: 180,
                    width: isMenuOpen ? "100%" : "auto",
                    marginTop: isMenuOpen ? 0 : 4,
                  }}
                >
                  <Link
                    to="/addProducts"
                    className="navbar-link admin-dropdown-link"
                    style={{
                      display: "block",
                      fontSize: "0.95rem",
                      width: "100%",
                      padding: "0.5rem 1rem",
                    }}
                    onClick={() => {
                      setAdminMenuOpen(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    <FaPlus style={{ marginRight: 6 }} />
                    Agregar producto
                  </Link>
                  <Link
                    to="/edit-category"
                    className="navbar-link admin-dropdown-link"
                    style={{
                      display: "block",
                      fontSize: "0.95rem",
                      width: "100%",
                      padding: "0.5rem 1rem",
                    }}
                    onClick={() => {
                      setAdminMenuOpen(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    <FaPlus style={{ marginRight: 6 }} />
                    Editar categoría
                  </Link>
                </div>
              )}
            </div>
          )}
          {user && (
            <button
              onClick={onLogout}
              className="navbar-link"
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                marginLeft: "1rem",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaSignOutAlt style={{ marginRight: 6 }} />
              Cerrar sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
