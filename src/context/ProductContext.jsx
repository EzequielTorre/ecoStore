import { createContext, useContext, useState, useEffect } from "react";
import { getData, postData, deleteData } from "../api/api";

// Crea el contexto:
const ProductContext = createContext();

// Hook para usar el contexto
export const useProducts = () => useContext(ProductContext);

// Proveedor del contexto:
export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargo productos al iniciar:
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getData("");
      setProducts(data);
      setError(null);
    } catch (err) {
      setError("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  // Agregar producto:
  const addProduct = async (product) => {
    await postData("", product);
    await fetchProducts();
  };

  // Eliminar producto:
  const removeProduct = async (id) => {
    await deleteData(id);
    await fetchProducts();
  };


  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        addProduct,
        removeProduct,
        setProducts, 
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}