'use client'

import authService from "@/app/appwrite/auth"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { loginSlice, logoutSlice } from "./authSlice"
import Loader from "@/app/components/Loader"
import { toast } from "react-toastify"

const UserProvider = ({children}) => {

    const dispatch = useDispatch()
    const [loading,setLoading] = useState(true)

    const notify = ()=>{
        toast.error('Please Login', {
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            progress: undefined,
          });
    }

    useEffect(() => {
        authService.getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(loginSlice({ userData }))
                } else {
                    dispatch(logoutSlice())
                    notify()
                }
            })
            .catch((error) => {
                console.error("Error fetching user:", error)
                notify()
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
