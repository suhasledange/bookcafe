import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import authSlice from "./authSlice";
import wishSlice from "./wishSlice";

export default configureStore({
    reducer:{
        cart:cartSlice,
        auth:authSlice,
        wish:wishSlice,
    }
})
