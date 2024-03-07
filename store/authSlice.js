import { createSlice } from "@reduxjs/toolkit";

const initialState={
    status:false,
    userData:null
}

const authSlice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        loginSlice:(state,action)=>{
            state.status = true,
            state.userData = action.payload.userData;
            
        },
        logoutSlice:(state)=>{
            state.status = false,
            state.userData=null;
        },
    }
})

export const {loginSlice,logoutSlice} = authSlice.actions

export default authSlice.reducer