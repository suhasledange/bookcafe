import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: Cookies.get("cartItems") ? JSON.parse(Cookies.get("cartItems")) : [],
    },
    reducers: {
        addToCart: (state, action) => {
            const item = state.cartItems.find((b) => b.Id === action.payload.Id);

            if (item) {
                item.quantity++;
                item.price = item.oneQuantityPrice * item.quantity;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }

            Cookies.set("cartItems", JSON.stringify(state.cartItems));
        },
        updateCart: (state, action) => {
            state.cartItems = state.cartItems.map((b) => {
                if (b.Id === action.payload.id) {
                    if (action.payload.key === "quantity") {
                        b.price = b.oneQuantityPrice * action.payload.val;
                    }
                    return { ...b, [action.payload.key]: action.payload.val };
                }
                return b;
            });

            Cookies.set("cartItems", JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((book) => book.Id !== action.payload.id);
            Cookies.set("cartItems", JSON.stringify(state.cartItems));
        },
        clearCart:(state)=>{
            state.cartItems = []
            Cookies.set("cartItems", JSON.stringify(state.cartItems));
        },
    },
});

export const { addToCart, updateCart, removeFromCart,clearCart } = cartSlice.actions;

export default cartSlice.reducer;
