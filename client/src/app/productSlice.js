import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProduct } from "services/product";

const initialState = {
  products: [],
  status: "idle",
};

export const createProductAction = createAsyncThunk(
  "products/createProduct",
  async (data, thunkAPI) => {
    try {
      const product = await createProduct(data);
      //   thunkAPI.dispatch(removeError());
      return product;
    } catch (error) {
      const { message } = error;
      //   thunkAPI.dispatch(addError(message));
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
  },
});

export default productSlice.reducer;
