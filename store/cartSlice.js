import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: Cookies.get("cartItems") ? JSON.parse(Cookies.get("cartItems")) : [],
    },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find((item) => item.Id === action.payload.Id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({
                    Id: action.payload.Id,
                    title: action.payload.title,
                    quantity: 1,
                });
            }

            Cookies.set("cartItems", JSON.stringify(state.cartItems));
        },

        updateCart: (state, action) => {
            state.cartItems = state.cartItems.map((item) => {
                if (item.Id === action.payload.id) {
                    return {
                        ...item,
                        [action.payload.key]: action.payload.val,
                    };
                }
                return item;
            });

            Cookies.set("cartItems", JSON.stringify(state.cartItems));
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item.Id !== action.payload.id);
            Cookies.set("cartItems", JSON.stringify(state.cartItems));
        },

        clearCart: (state) => {
            state.cartItems = [];
            Cookies.set("cartItems", JSON.stringify(state.cartItems));
        },
    },
});

export const { addToCart, updateCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
