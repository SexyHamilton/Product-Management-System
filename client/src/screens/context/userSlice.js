import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        cart: [],
        userInfo: "",
    },
    reducers: {
        addToCart: (state, action) => {
            state.cart.push(action.payload);
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
    },
});

export const { addToCart, setUserInfo } = userSlice.actions;
export default userSlice.reducer;
