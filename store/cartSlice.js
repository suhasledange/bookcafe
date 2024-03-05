import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
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

export const useCart = () => {
    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cart.cartItems));
    }, [cart.cartItems]);

    return cart;
};


export const {addToCart,updateCart,removeFromCart} = cartSlice.actions;

export default cartSlice.reducer