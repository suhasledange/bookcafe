'use client'

import authService from "@/app/appwrite/auth"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { loginSlice, logoutSlice } from "./authSlice"
import Loader from "@/app/components/Loader"

const UserProvider = ({children}) => {

    const dispatch = useDispatch()
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        authService.getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(loginSlice({ userData }))
                } else {
                    dispatch(logoutSlice())
                }
            })
            .catch((error) => {
                console.error("Error fetching user:", error)
                })
            .finally(() => {
                setLoading(false)
            })
    }, [])
        
    return (
   <>
    {   !loading ?
        <div>
        {children}
        </div> : <div className="w-full h-screen flex items-center justify-center"> <Loader className='h-[30rem]'/> </div>
    }
    </>
  )
}

export default UserProvider
