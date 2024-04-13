'use client'
import Toast from '@/app/components/Toast';
import { createContext, useState } from 'react';

export const ToastContext = createContext()

export const ContextProvider = ({ children }) => {

  const [showToast,setShowtoast] = useState(false);
  const [message,setShowMessage] = useState('');
  const [Time,setTime] = useState();

  const notifyToast = (message,time) =>{

    setShowMessage(message);
    setTime(time)
    setShowtoast(true);
    setTimeout(()=>setShowtoast(false),1500)

  }

  return (
    <ToastContext.Provider value={{
      notifyToast,
    }}>
      {children}
        {showToast && <Toast message={message} time={Time}/>}

    </ToastContext.Provider>
  )
}