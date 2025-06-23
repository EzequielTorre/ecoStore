import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useSweetAlert } from "../context/SweetAlertContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useProducts } from "../context/ProductContext";
import { RiAdminFill } from "react-icons/ri";
import { FaTrash, FaShoppingCart } from "react-icons/fa";

// Mi componente ProductCard muestra la información de un producto, permite agregarlo al carrito y, si el usuario es administrador, editar o eliminar el producto.
const ProductCard = ({ product, onDelete }) => {
  const { addToCart } = useCart();
  const { showAlert } = useSweetAlert();
  const { user } = useAuth();
  const { removeProduct } = useProducts();
  const [deleting, setDeleting] = useState(false);

  const ADMIN_EMAIL = "admin@gmail.com";
  const isAdmin =
    user &&
    user.email &&
    user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  const handleDelete = async () => {
    const result = await showAlert({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el producto de forma permanente.",
      icon: "warning",
      confirmButtonText: "Sí, eliminar",
      confirmButtonColor: "#d33",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      setDeleting(true);
      try {
        await removeProduct(product.id);
        if (onDelete) onDelete(product.id);
      } catch (error) {
        showAlert({
          title: "Error",
          text: "No se pudo eliminar el producto.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      } finally {
        setDeleting(false);
      }
    }
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
    showAlert({
      title: "Producto agregado",
      text: `Agregaste "${product.title}" por un valor de $${Number(
        product.price
      ).toFixed(2)} al carrito.`,
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  };

  return (
    <div className="product-card">
      {product.isNew && <span className="product-badge">Nuevo</span>}
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">${Number(product.price).toFixed(2)}</p>
        <p className="product-description">{product.description}</p>
        <div className="product-actions">
          <Link to={`/product/${product.id}`} className="btn btn-primary">
            Ver detalles
          </Link>
          <button
            onClick={handleAddToCart}
            className="btn"
            style={{
              backgroundColor: "#27ae60",
              color: "#fff",
              padding: "8px 12px",
            }}
            title="Agregar al carrito"
          >
            <FaShoppingCart />
          </button>
        </div>
      </div>
      {isAdmin && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginTop: 8,
          }}
        >
          <Link
            to={`/edit-product/${product.id}`}
            className="btn btn-primary"
            style={{ width: "100%" }}
          >
            <RiAdminFill style={{ marginRight: 6, color: "red" }} />
            Editar producto
          </Link>
          <button
            className="btn btn-secondary"
            onClick={handleDelete}
            disabled={deleting}
            style={{ width: "100%" }}
          >
            <FaTrash style={{ marginRight: 6 }} />
            {deleting ? "Eliminando..." : "Eliminar producto"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
