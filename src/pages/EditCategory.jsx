import { useState } from "react";
import { useProducts } from "../context/ProductContext";
import "../styles/FormStyles.css";

const EditCategory = () => {
  const { products, fetchProducts } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [createCategory, setCreateCategory] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const categories = [...new Set(products.map((p) => p.category))];

  // Editar categoría existente:
  const handleEdit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");
    try {
      const toUpdate = products.filter((p) => p.category === selectedCategory);
      await Promise.all(
        toUpdate.map((prod) =>
          fetch(
            `https://68100d8d27f2fdac24101f34.mockapi.io/productos/${prod.id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...prod, category: newCategory }),
            }
          )
        )
      );
      setSuccessMsg("¡Categoría actualizada correctamente!");
      fetchProducts();
    } catch (error) {
      setErrorMsg("Ocurrió un error al actualizar la categoría.");
    }
  };

  // Crear nueva categoría: 
  const handleCreate = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");
    if (!createCategory.trim()) {
      setErrorMsg("El nombre de la nueva categoría no puede estar vacío.");
      return;
    }
    
    setSuccessMsg(
      `¡Categoría "${createCategory}" creada! Ya puedes usarla al crear o editar productos.`
    );
    setCreateCategory("");
    fetchProducts();
  };

  return (
    <div className="form-center-container">
      <div className="form-card">
        <h2 className="form-title">Editar Categoría</h2>
        <form onSubmit={handleEdit} className="form-styled">
          <div className="form-group">
            <label className="form-label">Categoría actual</label>
            <select
              className="form-input"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Nuevo nombre</label>
            <input
              type="text"
              className="form-input"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="form-btn">
            Actualizar categoría
          </button>
        </form>

        <hr style={{ margin: "2rem 0" }} />

        <h2 className="form-title" style={{ fontSize: "1.3rem" }}>
          Crear nueva categoría
        </h2>
        <form onSubmit={handleCreate} className="form-styled">
          <div className="form-group">
            <label className="form-label">Nombre de la nueva categoría</label>
            <input
              type="text"
              className="form-input"
              value={createCategory}
              onChange={(e) => setCreateCategory(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="form-btn">
            Crear categoría
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

export default EditCategory;
