import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Layout from "components/Layout";
import Login from "pages/Login";
import Signup from "pages/Signup";
import { useSelector } from "react-redux";
import Home from "pages/Home";
import NewProduct from "pages/Product/NewProduct";
import NotFound from "pages/NotFound";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="new-product" element={<NewProduct />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
