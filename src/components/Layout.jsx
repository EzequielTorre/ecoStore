import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Helmet } from "react-helmet-async";

// El componente Layout, mi contenedor principal que incluye la barra de navegación, el pie de página y el contenido principal.
const Layout = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <Helmet>
        <title>EcoTienda | Productos de limpieza ecológicos</title>
        <meta
          name="description"
          content="EcoTienda: Venta de productos de limpieza ecológicos para el hogar y la empresa. Soluciones amigables con el medio ambiente."
        />
        <meta
          name="keywords"
          content="ecotienda, limpieza ecológica, productos ecológicos, tienda online, hogar, empresa"
        />
        <meta name="author" content="EcoTienda" />
        <meta
          property="og:title"
          content="EcoTienda | Productos de limpieza ecológicos"
        />
        <meta
          property="og:description"
          content="Venta de productos de limpieza ecológicos para el hogar y la empresa."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar onLogout={logout} />
      <main className="container" aria-label="Contenido principal">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
