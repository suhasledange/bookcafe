import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

export const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cartItems:[],
    },
    reducers:{
        addToCart:(state,action) =>{ 

            const item = state.cartItems.find(
                (b) => b.Id === action.payload.Id
            )

            if(item){
                item.quantity++;
                item.price = item.oneQuantityPrice * item.quantity;
            }
            else{   
                state.cartItems.push({...action.payload,quantity:1})
            }
        
        },
        updateCart:(state,action)=>{
            state.cartItems = state.cartItems.map((b) => {
                if (b.Id === action.payload.id) {
                    if (action.payload.key === "quantity") {
                        b.price = b.oneQuantityPrice * action.payload.val;
                    }
                    return { ...b, [action.payload.key]: action.payload.val };
                }
                return b;
            });
        },
        removeFromCart:(state,action)=>{ state.cartItems = state.cartItems.filter((book)=> book.Id != action.payload.id ) },
    }
})



export const {addToCart,updateCart,removeFromCart} = cartSlice.actions;

export default cartSlice.reducer