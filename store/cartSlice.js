import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cartItems:[],
    },
    reducers:{
        addToCart:(state,action) =>{ state.cartItems.push(action.payload) },
        updateCart:(state,action)=>{},
        removeFromCart:(state,action)=>{ state.cartItems = state.cartItems.filter((book)=> book.Id != action.payload.id ) },
    }
})

export const {addToCart,updateCart,removeFromCart} = cartSlice.actions;

export default cartSlice.reducer