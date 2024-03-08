import { createSlice } from "@reduxjs/toolkit";

const initialState={
    status:false,
    verify:"none",
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
        setPending:(state)=>{
            state.verify = "pending"
        },
        setVerified:(state)=>{
            state.verify = "verified"
        }
    }
})

export const {loginSlice,logoutSlice} = authSlice.actions

export default authSlice.reducer