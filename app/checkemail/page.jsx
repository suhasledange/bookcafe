'use client'
import { useEffect } from "react"
import Container from "../components/Container"
import authService from "../appwrite/auth"
import { useDispatch, useSelector} from "react-redux"
import { setPending } from "@/store/authSlice"
import { useRouter } from "next/navigation"

const Checkemail = () => {

    const dispatch = useDispatch()
    const router = useRouter()
    const verify = useSelector(state=> state.auth.verify)
    if(verify === 'verified') router.push('/')
    
    useEffect(()=>{

        const getUser = async()=>{
            const {emailVerification} = await authService.getCurrentUser()
            if(!emailVerification) dispatch(setPending())
        }
        getUser()
    },[])


  return (
    <Container className=" max-w-screen-xl flex items-center justify-center h-[30rem]">
      <h1 className="text-xl font-bold"> Please Check Your Email For Verification</h1>
    </Container>
  )
}

export default Checkemail