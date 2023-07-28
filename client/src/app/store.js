import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import productReducer from "./productSlice";
import errorReducer from "./errorSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    error: errorReducer,
  },
  devTools: true,
});
