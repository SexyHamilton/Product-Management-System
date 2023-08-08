import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  updateProduct,
  fetchProducts,
  fetchOneProduct,
} from "services/product";
import { removeError, addError } from "./errorSlice";

const initialState = {
  products: [],
  status: "idle",
  currentProduct: {},
};

export const createProductAction = createAsyncThunk(
  "products/createProduct",
  async (data, thunkAPI) => {
    try {
      const product = await createProduct(data);
      thunkAPI.dispatch(removeError());
      return product;
    } catch (error) {
      const { message } = error;
      thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchProductsAction = createAsyncThunk(
  "products/fetchProducts",
  async (data, thunkAPI) => {
    try {
      const products = await fetchProducts(data);
      thunkAPI.dispatch(removeError());
      return products;
    } catch (error) {
      const { message } = error;
      thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProductAction = createAsyncThunk(
  "products/updateProducts",
  async (data, thunkAPI) => {
    try {
      const product = await updateProduct(data);
      thunkAPI.dispatch(removeError());
      return product;
    } catch (error) {
      const { message } = error;
      thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchOneProductAction = createAsyncThunk(
  "products/fetchOneProduct",
  async (data, thunkAPI) => {
    try {
      const product = await fetchOneProduct(data);
      const productStr = JSON.stringify(product);
      localStorage.setItem("thisProduct", productStr);
      thunkAPI.dispatch(removeError());
      return product;
    } catch (error) {
      const { message } = error;
      thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createProductAction.fulfilled, (state, action) => {
      state.products.push(action.payload);
      state.status = "succeeded";
    });
    builder.addCase(createProductAction.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(createProductAction.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(fetchProductsAction.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.products = action.payload;
    });
    builder.addCase(fetchProductsAction.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(fetchProductsAction.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(updateProductAction.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(updateProductAction.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(updateProductAction.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(fetchOneProductAction.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.currentProduct = action.payload;
    });
    builder.addCase(fetchOneProductAction.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(fetchOneProductAction.pending, (state, action) => {
      state.status = "pending";
    });
  },
});

export default productSlice.reducer;
