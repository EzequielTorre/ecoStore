import { useState } from "react";
import ProductCard from "./ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


const ProductCarousel = ({ products, onDelete }) => {
  const [current, setCurrent] = useState(0);

  if (!products || products.length === 0)
    return <p className="text-center mt-8 text-gray-500">No hay productos.</p>;

  const goLeft = () => setCurrent((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  const goRight = () => setCurrent((prev) => (prev === products.length - 1 ? 0 : prev + 1));

  return (
    <div className="carousel-container">
      <button className="carousel-arrow" onClick={goLeft} aria-label="Anterior">
        <FaChevronLeft />
      </button>
      <div className="carousel-cards">
        {products.map((product, idx) => {
          
          const offset = idx - current;
          let className = "carousel-card";
          if (offset === 0) className += " active";
          else if (Math.abs(offset) === 1) className += " side";
          else className += " hidden";
          return (
            <div key={product.id} className={className} style={{ zIndex: 10 - Math.abs(offset) }}>
              <ProductCard
                product={product}
                onDelete={onDelete}
                disableActions={offset !== 0} 
              />
            </div>
          );
        })}
      </div>
      <button className="carousel-arrow" onClick={goRight} aria-label="Siguiente">
        <FaChevronRight />
      </button>
    </div>
  );
};

export default ProductCarousel;
