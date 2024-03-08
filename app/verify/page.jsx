'use client'
import { useRouter, useSearchParams } from "next/navigation"
import Container from "../components/Container"
import Button from "../components/Button"
import authService from "../appwrite/auth"
import { useDispatch } from "react-redux"
import { setVerified } from "@/store/authSlice"

const Verification = () => {

  const dispatch = useDispatch()

  const router = useRouter()

  const params = useSearchParams()

  const secret = params.get('secret')
  const id = params.get('userId');

  if(!secret && !id) router.push('/')
  else{
      
      const verify = async ()=>{
        try {
          const promise = await authService.verifyEmail({secret,id})
          if(promise) {
              dispatch(setVerified())
              router.push('/login')
          }

        } catch (error) {
            console.log(error)
        }
  
      }
    
    verify()
  }

  return (
      <Container className=" max-w-screen-xl flex items-center justify-center h-[30rem]">

          <div className="text-xl font-bold">Verified Successfully</div>
        
      </Container>

  )
}

export default Verification
