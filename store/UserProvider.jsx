'use client'
import { getSesssion, getCurrentUser, logoutAccount } from "@/app/appwrite/auth";
import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { loginSlice, logoutSlice, setGData } from "./authSlice"
import Loader from "@/app/components/Loader"

const UserProvider = ({children}) => {

    const dispatch = useDispatch()
    const [loading,setLoading] = useState(true)


    const fetchData = useCallback(async () => {

      const data = await getSesssion();
      if(data){
        try {
          const response = await fetch('https://people.googleapis.com/v1/people/me?personFields=photos,names,emailAddresses,phoneNumbers', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${data?.providerAccessToken}`,
            },
          });
          
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          
          const userData = await response.json();
          dispatch(setGData({userData}))
        } catch (error) {
          console.error(error);
        }
      }; 
    },[])

    useEffect(() => {
        fetchData();
      }, [fetchData]);
  
    
      const getNormalUser = useCallback(async ()=>{
        await getCurrentUser()
        .then((data) => {
            if (data) {
                if(data.emailVerification){

                    dispatch(loginSlice({ data }))
                }  
            } else {
                dispatch(logoutSlice())
                logoutAccount()
            }
        })
        .catch((error) => {
            console.log("User Not Found")
            })
        .finally(() => {
            setLoading(false)
        })
      },[])
    
      useEffect(() => {
          getNormalUser()
    }, [getNormalUser])
        
    return (
   <>
    {   !loading ?
        (
        <div>
        {children}
        </div> 
        ) :
        (
        <div className="w-full h-screen flex items-center justify-center"> <Loader className='h-[30rem]'/> </div>
        )
      }
    </>
  )
}

export default UserProvider
