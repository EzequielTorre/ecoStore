import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../api/api.jsx";
import { useCart } from "../context/CartContext";
import { useSweetAlert } from "../context/SweetAlertContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { showAlert } = useSweetAlert();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getData(id);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar el producto");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showAlert({
      title: "Producto agregado",
      text: `Agregaste "${product.title}" por un valor de $${Number(
        product.price
      ).toFixed(2)} al carrito.`,
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  };

  if (loading) return <div className="text-center mt-4">Cargando...</div>;
  if (error)
    return <div className="text-center mt-4 text-red-500">{error}</div>;
  if (!product)
    return <div className="text-center mt-4">Producto no encontrado</div>;

  return (
    <div className="product-detail-container">
      <h2 className="product-detail-title">Detalles del Producto</h2>
      <div className="product-detail-grid">
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="product-detail-image"
          />
        </div>
        <div className="product-detail-info">
          <div>
            <span className="product-detail-category">{product.category}</span>
            <h1 className="product-detail-title">{product.title}</h1>
            <p className="product-detail-price">
              ${Number(product.price).toFixed(2)}
            </p>
          </div>

          <p className="product-detail-description">{product.description}</p>

          <div className="quantity-selector">
            <button
              className="quantity-btn"
              onClick={() => handleQuantityChange(-1)}
            >
              -
            </button>
            <input
              type="number"
              className="quantity-input"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              min="1"
            />
            <button
              className="quantity-btn"
              onClick={() => handleQuantityChange(1)}
            >
              +
            </button>
          </div>

          <div className="product-detail-actions">
            <button onClick={handleAddToCart} className="btn btn-primary">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
