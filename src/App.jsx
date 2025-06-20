import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { SweetAlertProvider } from "./context/SweetAlertContext";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Category from "./pages/Category";
import Cart from "./components/Cart";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Protected from "./pages/Protected";
import AddProduct from "./pages/AddProduct";
import EditCategory from "./pages/EditCategory";
import EditProduct from "./pages/EditProduct";
import "./styles/global.css";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <SweetAlertProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="category" element={<Category />} />
                <Route path="product/:id" element={<ProductDetail />} />
                <Route
                  path="cart"
                  element={
                    <Protected>
                      <Cart />
                    </Protected>
                  }
                />
                <Route path="login" element={<Login />} />
                <Route path="contact" element={<Contact />} />
                <Route path="register" element={<Register />} />
                <Route
                  path="addProducts"
                  element={
                    <Protected adminOnly>
                      <AddProduct />
                    </Protected>
                  }
                />
                <Route
                  path="edit-category"
                  element={
                    <Protected adminOnly>
                      <EditCategory />
                    </Protected>
                  }
                />
                <Route
                  path="edit-product/:id"
                  element={
                    <Protected adminOnly>
                      <EditProduct />
                    </Protected>
                  }
                />
              </Route>
            </Routes>
          </Router>
        </SweetAlertProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
