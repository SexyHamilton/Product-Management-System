import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signIn, signUp, updatePassword } from "services/auth";
import { removeError, addError } from "./errorSlice";

const initialState = {
  user: {},
  isAuthenticated: false,
  status: "idle",
};

export const authUser = createAsyncThunk(
  "currentUser/authUser",
  async (data, thunkAPI) => {
    try {
      const user = await signIn(data);
      localStorage.setItem("token", user.token);
      thunkAPI.dispatch(removeError());
      return user;
    } catch (error) {
      const { message } = error;
      //add error into reducer
      thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signUpUser = createAsyncThunk(
  "currentUser/signUpUser",
  async (data, thunkAPI) => {
    try {
      const user = await signUp(data);
      thunkAPI.dispatch(removeError());
      return user;
    } catch (error) {
      const { message } = error;
      thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "currentUser/updatePassword",
  async (data, thunkAPI) => {
    try {
      const user = await updatePassword(data);
      thunkAPI.dispatch(removeError());
      return user;
    } catch (error) {
      const { message } = error;
      thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!Object.keys(action.payload).length; //!! can set the result as a boolean
    },
    logOutUser: (state, action) => {
      state.isAuthenticated = false;
      state.user = {};
      state.status = "idle";
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!Object.keys(action.payload).length;
      state.status = "succeeded";
    });
    builder.addCase(authUser.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(authUser.rejected, (state, action) => {
      state.status = "failed";
      state.isAuthenticated = false;
      state.user = {};
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(signUpUser.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(updateUser.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
  },
});
export const { setCurrentUser, logOutUser } = userSlice.actions;
export default userSlice.reducer;
