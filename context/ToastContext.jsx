'use client'
import Container from '@/app/components/Container';
import Toast from '@/app/components/Toast';
import { createContext, useState } from 'react';

export const ToastContext = createContext()

export const ContextProvider = ({ children }) => {

  const [showToastCart, setShowToast] = useState(false);
  const [showToastWish, setShowToast1] = useState(false);
  const [showToastCredentials, setShowCrendentials] = useState(false);
  const [showLogin,setShowLogin] = useState(false);
  const [showprofile,setShowprofile] = useState(false);

  const [errorMsg, setShowError] = useState(false)

  const notifyLogin = ()=>{
    setShowLogin(true);
    setTimeout(()=> setShowLogin(false),2000)
  }
  const notifyProfile = ()=>{
    setShowprofile(true);
    setTimeout(()=> setShowprofile(false),2500)
  }

  const notifyCart = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1000);
  }
  const notifyWish = () => {
    setShowToast1(true);
    setTimeout(() => setShowToast1(false), 1000);
  }
  const notifyError = () => {
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);

  }
  const notifyCrendentials = () => {
    setShowCrendentials(true);
    setTimeout(() => setShowCrendentials(false), 2000);

  }

  return (
    <ToastContext.Provider value={{
      notifyCart,
      notifyWish,
      notifyError,
      notifyCrendentials,
      notifyLogin,
      notifyProfile,
      showToastCart,
      showToastWish,
      errorMsg
    }}>
      {children}
        {showToastCart && <Toast message="Item Added to Cart" />}
        {showToastWish && <Toast message="Item Added to Wishlist" />}
        {showToastCredentials &&  <Toast time={2000} message="Invalid Crendentials" />}
        {showLogin &&  <Toast time={2000} message="Please Login to proceed" />}
        {showprofile &&  <Toast time={2500} message="Please update your profile to proceed" />}
        {errorMsg && <Toast time={3000} message="Error fetching data from the server. Please try again later!!!" />}
    </ToastContext.Provider>
  )
}