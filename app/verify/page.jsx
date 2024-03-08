'use client'

import { useRouter, useSearchParams } from "next/navigation"
import Container from "../components/Container"
import Button from "../components/Button"
import authService from "../appwrite/auth"
import { useDispatch } from "react-redux"

const Verification = () => {

  const router = useRouter()

  const params = useSearchParams()

  const secret = params.get('secret')
  const id = params.get('userId');

  if(!secret && !id) router.push('/')
  else{
      
      const verify = async ()=>{
  
        try {
          await authService.verifyEmail({secret,id})
        } catch (error) {
            console.log(error)
        }
  
      }
    
    verify()
  }

  return (
      <Container className=" max-w-screen-xl flex items-center justify-center h-[30rem]">

        <div onClick={()=>router.push('/')}>
          <Button text='Verify'/>
        </div>

      </Container>

  )
}

export default Verification
