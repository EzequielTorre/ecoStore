import { useState, useEffect } from "react";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import { FaSearch } from "react-icons/fa";
import "../styles/global.css";
import { Helmet } from "react-helmet-async";

const Category = () => {
  const { products, loading, error, fetchProducts } = useProducts();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Obtener categorías únicas
  const categories = [...new Set(products.map((p) => p.category))];

  // Filtrado por búsqueda y categoría
  const filteredProducts = products.filter((prod) => {
    const matchesCategory = selectedCategory
      ? prod.category === selectedCategory
      : true;
    const matchesSearch =
      prod.title.toLowerCase().includes(search.toLowerCase()) ||
      prod.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleDeleteProduct = () => {
    fetchProducts();
  };

  if (loading && !products.length)
    return <div className="text-center mt-4">Cargando...</div>;
  if (error)
    return <div className="text-center mt-4 text-red-500">{error}</div>;

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
        <h1 style={{ fontSize: "2.5rem", fontWeight: 700, color: "#2980b9" }} className="text-center text-3xl font-bold my-8">
          Nuestros Productos
        </h1>

        {/* Barra de búsqueda */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "1.5rem 0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#fff",
              borderRadius: 6,
              boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
              padding: "0.5rem 1rem",
              width: 320,
              maxWidth: "90%",
            }}
          >
            <FaSearch
              style={{
                color: "#888",
                fontSize: "1.5rem",
                marginRight: 8,
              }}
              aria-label="Buscar"
            />
            <input
              type="text"
              className="form-input"
              style={{
                border: "none",
                outline: "none",
                boxShadow: "none",
                width: "100%",
                background: "transparent",
                fontSize: "1rem",
              }}
              placeholder="Buscar por nombre o categoría..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Buscar productos"
            />
          </div>
        </div>

        {/* Botones de categoría */}
        <div className="category-buttons">
          <button
            className={`category-button ${!selectedCategory ? "active" : ""}`}
            onClick={() => handleCategoryClick(null)}
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`category-button ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Productos filtrados y paginados */}
        <div className="products-grid">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={handleDeleteProduct}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center mt-8 text-gray-500">
            No se encontraron productos.
          </div>
        )}

        {/* Paginador */}
        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "2rem 0",
              gap: 8,
            }}
          >
            <button
              className="category-button"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              aria-label="Página anterior"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`category-button${
                  currentPage === i + 1 ? " active" : ""
                }`}
                onClick={() => setCurrentPage(i + 1)}
                aria-label={`Página ${i + 1}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="category-button"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              aria-label="Página siguiente"
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
