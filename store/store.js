import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import authSlice from "./authSlice";

export default configureStore({
    reducer:{
        cart:cartSlice,
        auth:authSlice,
    }
})
