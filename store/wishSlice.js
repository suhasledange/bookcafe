import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const wishSlice = createSlice({
    name: 'wish',
    initialState: {
        wishItems: Cookies.get("wishItems") ? JSON.parse(Cookies.get("wishItems")) : [],
    },
    reducers: {
        addToWish: (state, action) => {
            const item = state.wishItems.find((b) => b.Id === action.payload.Id);

            if (item) {
              
            } else {
                state.wishItems.push({ ...action.payload});
            }

            Cookies.set("wishItems", JSON.stringify(state.wishItems));
        },
        removeFromWish: (state, action) => {
            state.wishItems = state.wishItems.filter((book) => book.Id !== action.payload.id);
            Cookies.set("wishItems", JSON.stringify(state.wishItems));
        },
    },
});

export const { addToWish, removeFromWish } = wishSlice.actions;

export default wishSlice.reducer;
