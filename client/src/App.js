import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Layout from "components/Layout";
import Login from "pages/Login";
import Signup from "pages/Signup";
import { useSelector } from "react-redux";
import AuthLayout from "components/Layout/AuthLayout";
import NewProduct from "pages/Product/NewProduct";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AuthLayout />}>
            <Route path="new-product" element={<NewProduct />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <div>
      Home
      <Link to="/app/new-product">Add Product</Link>
    </div>
  );
}

export default App;
