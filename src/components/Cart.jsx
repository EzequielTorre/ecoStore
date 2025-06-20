import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { BiSolidTrash } from "react-icons/bi";
import { FaShoppingCart, FaCreditCard } from "react-icons/fa";
import { useSweetAlert } from "../context/SweetAlertContext";
import "../styles/global.css";

// Componente Cart:
const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { showAlert } = useSweetAlert();

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );
  const tax = subtotal * 0.21; // Agrego el 21% de impuesto.
  const total = subtotal + tax;

  const handleCheckout = () => {
    showAlert({
      title: "¡Gracias por tu compra!",
      text: "Tu pedido ha sido procesado exitosamente.",
      icon: "success",
      confirmButtonText: "Aceptar",
    }).then(() => {
      clearCart();
    });
  };

  // Si el carrito está vacío, mostrar un mensaje y un botón para ir a comprar.
  // Si hay productos, mostrar el carrito con los detalles de cada producto.
  if (cart.length === 0) {
    return (
      <div
        style={{
          position: "relative",
          minHeight: "calc(100vh - 120px)", 
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="nature-background" />
        <div className="cart-empty" style={{ position: "relative", zIndex: 1 }}>
          <h2>Tu carrito está vacío</h2>
          <br />
          <Link to="/" className="btn btn-primary">
            Ir a comprar
          </Link>
        </div>
      </div>
    );
  }

  // Si hay productos en el carrito, mostrar los detalles del carrito.
  // Muestra el título del carrito, los productos, el subtotal, el IVA y el total.
  return (
    <div style={{ position: "relative" }}>
      <div className="nature-background" />
      <div
        className="cart-container"
        style={{ position: "relative", zIndex: 1 }}
      >
        <h2 className="cart-title">Tu Carrito</h2>

        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p className="cart-item-price">
                  ${Number(item.price).toFixed(2)}
                </p>
                <div className="cart-item-quantity">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="quantity-btn"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="cart-item-remove"
              >
                <BiSolidTrash />
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="cart-summary-row">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="cart-summary-row">
            <span>IVA (21%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="cart-summary-row total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="cart-actions">
          <Link to="/" className="btn btn-secondary">
            <FaShoppingCart style={{ marginRight: 6 }} />
            Seguir comprando
          </Link>
          <button className="btn btn-primary" onClick={handleCheckout}>
            <FaCreditCard style={{ marginRight: 6 }} />
            Realizar pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
