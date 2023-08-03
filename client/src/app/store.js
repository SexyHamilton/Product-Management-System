import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import productReducer from "./productSlice";
import errorReducer from "./errorSlice";
import cartReducer from "./cartSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
    error: errorReducer,
  },
  devTools: true,
});
