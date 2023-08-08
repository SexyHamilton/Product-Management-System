import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "components/Layout";
import Login from "pages/Login";
import Signup from "pages/Signup";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import UpdatePassword from "pages/UpdatePassword";
import Cart from "pages/Cart";
import ProductDetail from "./pages/Product/ProductDetail";
import { useSelector } from "react-redux";
import UpdateProduct from "./pages/Product/UpdateProduct";
import CreateProduct from "./pages/Product/CreateProduct";

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={isAuthenticated ? <Home /> : <Navigate to="login" />}
          />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="updatePassword" element={<UpdatePassword />} />
          <Route
            path="new-product"
            element={
              isAuthenticated ? <CreateProduct /> : <Navigate to="login" />
            }
          />
          <Route
            path="update-product/:productId"
            element={
              isAuthenticated ? <UpdateProduct /> : <Navigate to="login" />
            }
          />
          <Route
            path="product/:productId"
            element={
              isAuthenticated ? <ProductDetail /> : <Navigate to="login" />
            }
          />
          <Route
            path="cart"
            element={isAuthenticated ? <Cart /> : <Navigate to="login" />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
