'use client'
import authService from '@/app/appwrite/auth';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext()

export const ContextProvider = ({children}) =>{

        const [currentUser,SetCurrentUser] = useState();

        const getUser = async()=>{
                    const user = await authService.getCurrentUser()
                    if(user) SetCurrentUser(user)
            }
        
       const logOutUser = async()=>{
                const promise = await authService.logoutAccount()
                if(promise) SetCurrentUser(null)
       }

        return(
            <UserContext.Provider value={{ 
                currentUser,
                SetCurrentUser,
                getUser,
                logOutUser,
            }}>
                {children}
            </UserContext.Provider>
        )
}