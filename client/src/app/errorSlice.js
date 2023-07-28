import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  message: null,
};

const errorsSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    addError: (state, action) => {
      state.message = action.payload;
    },
    removeError: (state, action) => {
      state.message = null;
    },
  },
});

export const { addError, removeError } = errorsSlice.actions;

export default errorsSlice.reducer;
