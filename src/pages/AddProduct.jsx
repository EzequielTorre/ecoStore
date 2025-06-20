import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import "../styles/FormStyles.css";

const initialState = {
  title: "",
  price: "",
  description: "",
  category: "",
  image: "",
};

const AddProduct = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { addProduct } = useProducts();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccessMsg("");
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      await addProduct(form);
      setSuccessMsg("¡Producto agregado exitosamente!");
      setForm(initialState);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setErrorMsg("Ocurrió un error al agregar el producto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-center-container">
      <div className="form-card">
        <h2 className="form-title">Agregar producto</h2>
        <form onSubmit={handleSubmit} className="form-styled">
          <div className="form-group">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Precio</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="form-input"
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Descripción</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="form-input"
              required
              rows={3}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Categoría</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Imagen (URL)</label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="form-btn" disabled={loading}>
            {loading ? "Agregando..." : "Agregar producto"}
          </button>
        </form>
        {successMsg && (
          <div style={{ color: "#27ae60", marginTop: 16, textAlign: "center" }}>
            {successMsg}
          </div>
        )}
        {errorMsg && (
          <div style={{ color: "#e74c3c", marginTop: 16, textAlign: "center" }}>
            {errorMsg}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
