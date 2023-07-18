import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./screens/Home";
import Signin from "./screens/Signin";
import Signup from "./screens/Signup";
import Update from "./screens/Update";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateProduct from "./screens/CreateProduct";
import ErrorPage from "./screens/ErrorPage";

function App() {
    return (
        <BrowserRouter>
            <div>
                <header>
                    <Header />
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/login" element={<Signin />}></Route>
                        <Route path="/signup" element={<Signup />}></Route>
                        <Route path="/update" element={<Update />}></Route>
                        <Route
                            path="/create"
                            element={<CreateProduct />}
                        ></Route>
                        <Route path="/*" element={<ErrorPage />} />
                    </Routes>
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
