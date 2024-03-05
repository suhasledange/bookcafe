import { createSlice } from "@reduxjs/toolkit";

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
        updateCart:(state,action)=>{},
        removeFromCart:(state,action)=>{ state.cartItems = state.cartItems.filter((book)=> book.Id != action.payload.id ) },
    }
})

export const {addToCart,updateCart,removeFromCart} = cartSlice.actions;

export default cartSlice.reducer