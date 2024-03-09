'use client'
import authService from "@/app/appwrite/auth"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { loginSlice, logoutSlice, setGData } from "./authSlice"
import Loader from "@/app/components/Loader"

const UserProvider = ({children}) => {

    const dispatch = useDispatch()
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {

            const data = await authService.getSesssion();

          try {
            const response = await fetch('https://people.googleapis.com/v1/people/me?personFields=photos,names,emailAddresses', {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${data?.providerAccessToken}`,
              },
            });
    
            if (!response.ok) {
              throw new Error('Failed to fetch user data from Google People API');
            }
    
            const userData = await response.json();
            dispatch(setGData({userData}))
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, []);
  



    useEffect(() => {

        authService.getCurrentUser()
            .then((data) => {
                if (data) {
                    if(data.emailVerification){

                        dispatch(loginSlice({ data }))
                    }  
                } else {
                    dispatch(logoutSlice())
                    authService.logoutAccount()
                }
            })
            .catch((error) => {
                console.log("User Not Found")
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
