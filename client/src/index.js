import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./app/store";
import "antd/dist/reset.css";
import "./index.css";
import jwtDecode from "jwt-decode";
import { setCurrentUser } from "app/userSlice";
import { StyleProvider } from "@ant-design/cssinjs";

if (localStorage.getItem("token")) {
  store.dispatch(setCurrentUser(jwtDecode(localStorage.getItem("token"))));
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <StyleProvider hashPriority="low">
      <App />
    </StyleProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
