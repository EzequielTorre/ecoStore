import { useProducts } from "../context/ProductContext";
import ProductCarousel from "../components/ProductCarousel";
import "../styles/global.css";
import { Helmet } from "react-helmet-async";
import { FaLeaf, FaShippingFast, FaLock, FaSmile } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  const { products, loading, error } = useProducts();
  const featuredProducts = products.slice(0, 6);

  return (
    <div style={{ position: "relative" }}>
      <Helmet>
        <title>EcoTienda | Productos ecológicos</title>
        <meta
          name="description"
          content="EcoTienda: Venta de productos de limpieza ecológicos para el hogar y la empresa."
        />
        <meta
          name="keywords"
          content="ecotienda, limpieza ecológica, productos ecológicos, tienda online, hogar, empresa"
        />
        <meta property="og:title" content="EcoTienda | Productos ecológicos" />
        <meta
          property="og:description"
          content="Venta de productos de limpieza ecológicos para el hogar y la empresa."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="nature-background" />

     
      <section
        style={{
          background: "rgba(255,255,255,0.85)",
          borderRadius: 16,
          padding: "3rem 2rem 2rem 2rem",
          margin: "2rem auto 2rem auto",
          maxWidth: 900,
          textAlign: "center",
          boxShadow: "0 4px 24px rgba(44,62,80,0.10)",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", fontWeight: 700, color: "#2980b9" }}>
          Bienvenido a EcoTienda
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: "#444",
            margin: "1rem 0 2rem 0",
          }}
        >
          Productos de limpieza ecológicos para el hogar y la empresa.
          <br />
          Cuida tu entorno, cuida el planeta.
        </p>
        <Link
          to="/category"
          className="btn btn-primary"
          style={{ fontSize: "1.1rem" }}
        >
          Ver productos
        </Link>
      </section>

      <section
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2.5rem",
          margin: "2rem 0",
          flexWrap: "wrap",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <FaLeaf style={{ fontSize: "2rem", color: "#27ae60" }} />
          <p style={{ marginTop: 8, fontWeight: 600 }}>Ecológicos</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <FaShippingFast style={{ fontSize: "2rem", color: "#2980b9" }} />
          <p style={{ marginTop: 8, fontWeight: 600 }}>Envío rápido</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <FaLock style={{ fontSize: "2rem", color: "#e67e22" }} />
          <p style={{ marginTop: 8, fontWeight: 600 }}>Pago seguro</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <FaSmile style={{ fontSize: "2rem", color: "#f1c40f" }} />
          <p style={{ marginTop: 8, fontWeight: 600 }}>Clientes felices</p>
        </div>
      </section>

      
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <h2
          className="text-xl font-semibold mb-4 text-center"
          style={{ marginTop: 32, color: "#2980b9" }}
        >
          Productos destacados
        </h2>
        {loading && (
          <div className="text-center mt-4">Cargando productos...</div>
        )}
        {error && <div className="text-center mt-4 text-red-500">{error}</div>}
        {!loading && !error && <ProductCarousel products={featuredProducts} />}
      </div>

      <div
        className="container"
        style={{ marginTop: 40, marginBottom: 40 }}
      ></div>
    </div>
  );
};

export default Home;
