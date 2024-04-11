import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
    status: false,
    verify: "none",
    userData: null
};

// Function to retrieve initial state from cookies
const getInitialStateFromCookies = () => {
    const cookieData = Cookies.get("authState");
    return cookieData ? JSON.parse(cookieData) : initialState;
};

const authSlice = createSlice({
    name: 'auth',
    initialState: getInitialStateFromCookies(),
    reducers: {
        setImage: (state, action) => {
            state.userData = {
                ...state.userData,
                Img: action.payload.image
            };
            Cookies.set("authState", JSON.stringify(state)); 
        },
        loginSlice: (state, action) => {
            state.status = true;
            state.verify = "verified";
            state.userData = {
                ...action.payload.data,
                Img: state.userData ? state.userData.Img : null 
            };
            Cookies.set("authState", JSON.stringify(state)); 
        },
        logoutSlice: (state) => {
            state.status = false;
            state.verify = "none";
            state.userData = null;
            Cookies.remove("authState");
        },
        setPending: (state) => {
            state.verify = "pending";
            Cookies.set("authState", JSON.stringify(state)); 
        },
        setVerified: (state) => {
            state.verify = "verified";
            Cookies.set("authState", JSON.stringify(state));
        }
    }
});

export const { loginSlice, logoutSlice, setPending, setVerified, setImage } = authSlice.actions;

export default authSlice.reducer;
