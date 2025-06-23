import { useProducts } from "../context/ProductContext";
import ProductCarousel from "../components/ProductCarousel";
import "../styles/global.css";
import { Helmet } from "react-helmet-async";

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
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <h1 className="text-center text-3xl font-bold my-8">
          Bienvenidos a EcoTienda
        </h1>
        <p className="text-center mb-8">
          Tu tienda de productos de limpieza ecológicos para el hogar y la
          empresa.
        </p>
        {loading && (
          <div className="text-center mt-4">Cargando productos...</div>
        )}
        {error && <div className="text-center mt-4 text-red-500">{error}</div>}
        {!loading && !error && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-center">
              Destacados
            </h2>
            <ProductCarousel products={featuredProducts} />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
