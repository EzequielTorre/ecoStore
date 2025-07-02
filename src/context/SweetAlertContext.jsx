import { createContext, useContext } from "react";
import Swal from "sweetalert2";


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