import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchCartFromTheUser,
  addProductToCart,
  dropProductFromCart,
  removeWholeProductFromCart,
} from "services/product";
import { removeError, addError } from "./errorSlice";

const initialState = {
  cartItems: [],
  status: "idle",
};

export const fetchCartAction = createAsyncThunk(
  "cart/fetchCart",
  async (data, thunkAPI) => {
    try {
      const cart = await fetchCartFromTheUser(data);
      thunkAPI.dispatch(removeError());
      return cart;
    } catch (error) {
      const { message } = error;
      thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeWholeProductFromCartAction = createAsyncThunk(
  "cart/removeProduct",
  async (data, thunkAPI) => {
    try {
      const remove = await removeWholeProductFromCart(data);
      thunkAPI.dispatch(removeError());
      return remove;
    } catch (error) {
      const { message } = error;
      thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addProductToCartAction = createAsyncThunk(
  "cart/addToCart",
  async (data, thunkAPI) => {
    try {
      const cart = await addProductToCart(data);
      thunkAPI.dispatch(removeError());
      return cart;
    } catch (error) {
      const { message } = error;
      thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const dropProductFromCartAction = createAsyncThunk(
  "cart/dropFromCart",
  async (data, thunkAPI) => {
    try {
      const cart = await dropProductFromCart(data);
      thunkAPI.dispatch(removeError());
      return cart;
    } catch (error) {
      const { message } = error;
      thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addItem: (state, action) => {
    //   const newItem = action.payload;
    //   const existItem = state.cartItems.find(
    //     (item) => item._id === newItem._id
    //   );
    //   const cartItems = existItem
    //     ? state.cartItems.map((item) =>
    //         item._id === existItem._id ? newItem : item
    //       )
    //     : [...state.cartItems, newItem];
    //     state.cartItems = cartItems;
    // },
    removeItem: (state, action) => {
      const cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItems = cartItems;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartAction.fulfilled, (state, action) => {
      state.cartItems = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(fetchCartAction.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(fetchCartAction.rejected, (state, action) => {
      state.status = "failed";
      state.cartItems = [];
    });
    builder.addCase(addProductToCartAction.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(addProductToCartAction.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(addProductToCartAction.fulfilled, (state, action) => {
      let items = state.cartItems;
      let newItem = action.payload;
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === newItem._id) {
          items[i].quantity += 1;
          break;
        }
      }
      state.cartItems = items;
      state.status = "succeeded";
    });
    builder.addCase(dropProductFromCartAction.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(dropProductFromCartAction.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(dropProductFromCartAction.fulfilled, (state, action) => {
      let items = state.cartItems;
      let newItem = action.payload;
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === newItem._id) {
          items[i].quantity -= 1;
          break;
        }
      }
      state.cartItems = items;
      state.status = "succeeded";
    });
    builder.addCase(
      removeWholeProductFromCartAction.fulfilled,
      (state, action) => {
        state.status = "succeeded";
      }
    );
    builder.addCase(
      removeWholeProductFromCartAction.pending,
      (state, action) => {
        state.status = "pending";
      }
    );
    builder.addCase(
      removeWholeProductFromCartAction.rejected,
      (state, action) => {
        state.status = "failed";
      }
    );
  },
});
export const { removeItem } = cartSlice.actions;
export default cartSlice.reducer;
