import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import './styles/global.css'  
import { ProductProvider } from "./context/ProductContext";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </HelmetProvider>
  </React.StrictMode>
);
