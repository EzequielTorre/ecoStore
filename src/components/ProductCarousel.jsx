import { useState } from "react";
import ProductCard from "./ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// El componente ProductCarousel muestra un carrusel de productos destacados.
const ProductCarousel = ({ products, onDelete }) => {
  const [current, setCurrent] = useState(0);

  if (!products || products.length === 0)
    return <p className="text-center mt-8 text-gray-500">No hay productos.</p>;

  const goLeft = () => {
    setCurrent((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const goRight = () => {
    setCurrent((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        width: "100%",
        maxWidth: 450,
        margin: "0 auto",
      }}
      role="region"
      aria-label="Carrusel de productos destacados"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          gap: "1rem",
        }}
      >
        <button
          onClick={goLeft}
          style={{
            background: "#3498db",
            border: "none",
            fontSize: "2rem",
            cursor: products.length > 1 ? "pointer" : "not-allowed",
            color: "#fff",
            borderRadius: "50%",
            width: 40,
            height: 40,
            opacity: products.length > 1 ? 1 : 0.5,
            transition: "background 0.2s",
          }}
          aria-label="Producto anterior"
          disabled={products.length <= 1}
        >
          <FaChevronLeft />
        </button>
        <div
          style={{
            minWidth: 320,
            maxWidth: 400,
            transition: "all 0.3s",
          }}
          aria-live="polite"
        >
          <ProductCard product={products[current]} onDelete={onDelete} />
        </div>
        <button
          onClick={goRight}
          style={{
            background: "#3498db",
            border: "none",
            fontSize: "2rem",
            cursor: products.length > 1 ? "pointer" : "not-allowed",
            color: "#fff",
            borderRadius: "50%",
            width: 40,
            height: 40,
            opacity: products.length > 1 ? 1 : 0.5,
            transition: "background 0.2s",
          }}
          aria-label="Producto siguiente"
          disabled={products.length <= 1}
        >
          <FaChevronRight />
        </button>
      </div>
      {/* Indicadores de posición */}
      <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
        {products.map((_, idx) => (
          <span
            key={idx}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: idx === current ? "#3498db" : "#d0d7de",
              display: "inline-block",
              transition: "background 0.2s",
            }}
            aria-label={idx === current ? "Producto actual" : `Ir al producto ${idx + 1}`}
            role="button"
            tabIndex={0}
            onClick={() => setCurrent(idx)}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") setCurrent(idx);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
