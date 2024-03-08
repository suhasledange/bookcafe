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
            state.verify="verified",
            state.userData = action.payload.data;
        },
        logoutSlice:(state)=>{
            state.status = false,
            state.userData=null,
            state.verify="none";
        },
        setPending:(state)=>{
            state.verify = "pending"
        },
        setVerified:(state)=>{
            state.verify = "verified"
        }
    }
})

export const {loginSlice,logoutSlice,setPending,setVerified} = authSlice.actions

export default authSlice.reducer