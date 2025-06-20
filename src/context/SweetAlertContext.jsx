import { createContext, useContext } from "react";
import Swal from "sweetalert2";

// El contexto SweetAlertContext proporciona una forma de mostrar alertas de SweetAlert2 en toda la aplicación.
const SweetAlertContext = createContext();

export const SweetAlertProvider = ({ children }) => {
  const showAlert = ({ title, text, icon = "info", confirmButtonText = "OK" }) => {
    return Swal.fire({
      title,
      text,
      icon,
      confirmButtonText,
    });
  };

 

  return (
    <SweetAlertContext.Provider value={{ showAlert }}>
      {children}
    </SweetAlertContext.Provider>
  );
};

export const useSweetAlert = () => useContext(SweetAlertContext);