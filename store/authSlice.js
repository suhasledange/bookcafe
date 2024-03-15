import { createSlice } from "@reduxjs/toolkit";

const initialState={
    status:false,
    verify:"none",
    Gdata:null,
    userData:null
}

const authSlice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        setGData:(state,action)=>{
            state.Gdata = action.payload.userData;
            state.status = true;
        },
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

export const {loginSlice,logoutSlice,setPending,setVerified,setGData} = authSlice.actions

export default authSlice.reducer