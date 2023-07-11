import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./screens/Home";
import Signin from "./screens/Signin";
import Signup from "./screens/Signup";
import Update from "./screens/Update";

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>Management Chuwa</header>
        <main>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/update" element={<Update />}></Route>
          </Routes>
        </main>
        <footer>
          <div className="footer">@2022 All Rights Reserved.</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
