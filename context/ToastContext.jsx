'use client'
import Container from '@/app/components/Container';
import Toast from '@/app/components/Toast';
import { createContext, useState } from 'react';

export const ToastContext = createContext()

export const ContextProvider = ({ children }) => {

  const [showToastCart, setShowToast] = useState(false);
  const [showToastWish, setShowToast1] = useState(false);
  const [showToastCredentials, setShowCrendentials] = useState(false);

  const [errorMsg, setShowError] = useState(false)

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
      showToastCart,
      showToastWish,
      errorMsg
    }}>
      {children}
        {showToastCart && <Toast message="Item Added to Cart" />}
        {showToastWish && <Toast message="Item Added to Wishlist" />}
        {showToastCredentials &&  <Toast time={2000} message="Invalid Crendentials" />}
        {errorMsg && <Toast time={3000} message="Error fetching data from the server. Please try again later!!!" />}
    </ToastContext.Provider>
  )
}