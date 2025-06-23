import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getData } from "../api/api";
import { useProducts } from "../context/ProductContext";
import "../styles/FormStyles.css";

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { fetchProducts } = useProducts();

  useEffect(() => {
    if (id) {
      setLoading(true);
      getData(id)
        .then((data) => {
          setProduct(data);
          setForm({
            title: data.title || "",
            price: data.price || "",
            description: data.description || "",
            category: data.category || "",
            image: data.image || "",
          });
          setLoading(false);
        })
        .catch(() => {
          setErrorMsg("No se pudo cargar el producto.");
          setLoading(false);
        });
    }
  }, [id]);

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
      await fetch(
        `https://68100d8d27f2fdac24101f34.mockapi.io/productos/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      setSuccessMsg("¡Producto actualizado correctamente!");
      fetchProducts();
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setErrorMsg("Ocurrió un error al actualizar el producto.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-4">Cargando...</div>;
  if (!product)
    return <div className="text-center mt-4">Producto no encontrado</div>;

  return (
    <div className="form-center-container">
      <div className="form-card">
        <h2 className="form-title">Editar producto</h2>
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
            {loading ? "Actualizando..." : "Actualizar producto"}
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

export default EditProduct;
