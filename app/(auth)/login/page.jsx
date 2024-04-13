// LoginForm.js
'use client'
import { useForm } from 'react-hook-form';
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';
import Container from '@/app/components/Container';
import authService from '@/app/appwrite/auth';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import Loader from '@/app/components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { loginSlice, logoutSlice } from '@/store/authSlice';
import service from '@/app/appwrite/service';
import { ToastContext } from '@/context/ToastContext';

const LoginForm = () => {
  
  const dispatch = useDispatch()
  const status = useSelector(state => state.auth.status)
  const { notifyToast} = useContext(ToastContext)

  const [loading,setLoading] = useState(false)
  const { register, handleSubmit, reset, formState: {errors} } = useForm();
  const router = useRouter()

  if(status) router.replace('/')

  const LoginWithGoogle = async()=>{
       await authService.LoginWithGoogle()
      }


  const onSubmit = async (data) => {

    setLoading(true)

    try {
      const userData = await authService.loginAccount(data);
      if(userData){
          let data = await authService.getCurrentUser()
          if (data.emailVerification) {

            const {$id} = data
            const {documents} = await service.getUserById(String($id))
            if(!documents.length){
                  await service.createUser(data)
            }
            data = documents[0]
          dispatch(loginSlice({ data }));
          router.replace('/');
        } else {
          dispatch(logoutSlice());
          const {userId} = await authService.createEmailVerification()
          if(userId) router.push('/checkemail')
        }
      }
    } catch (error) {
        notifyToast("Invalid Crendentials",2000)
    } finally {
      reset();
      setLoading(false);
    }
    
  };

  return (
    <Container className="md:px-0 px-3 max-w-screen-xl mt-10 mb-10">
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      <div className="flex flex-col space-y-4">
        <div className=' space-y-2'>
          <label htmlFor="email" className="block text-md font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email', { required: true })}
            className="mt-1 p-3 border outline-black rounded-sm border-gray-300 w-full"
          />
          {errors.email?.type === "required" && (
              <p role="alert" className='text-sm text-red-800 font-light'>Email is required</p>
            )}
        </div>

        <div className=' space-y-2'>
          <label htmlFor="password" className="block text-md font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register('password', { required: true })}
            className="mt-1 p-3 border outline-black rounded-sm border-gray-300  w-full"
          />
          {errors.password?.type === "required" && (
              <p role="alert" className='text-sm text-red-800 font-light'>Password is required</p>
            )}
        </div>

        <div className="text-left">
          <Link href="#" className=' text-sm'>
            Forgot your Password?
          </Link>
        </div>

        <div>
          <button
            type="submit"
            className="text-lg gap-3 flex items-center justify-center bg-black text-white p-3 rounded-sm w-full hover:bg-black/[0.9] transition duration-150"
          >
            Login {loading ? <Loader className1="border-white w-6 h-6 "/> :""}
          </button>
        </div>
        <div>
            <h2 className=' text-gray-700'>Don't have an account yet ? <Link href='/signup' className='hover:text-gray-900 duration-100 underline underline-offset-2'>Create account</Link> </h2>
        </div>
      </div>
         
          <div className='mt-8 mb-5 space-y-8'>
            <div className='flex items-center justify-center gap-5'>
            <div className='flex-[0.45] bg-gray-500 h-[1.4px]'></div>
            <span className='text-gray-600'>or login with</span>
            <div className='flex-[0.45] bg-gray-500 h-[1.4px]'></div>
            </div>
            <div className='flex items-center justify-center'>
                  <div onClick={LoginWithGoogle} className='transition-transform active:scale-95 hover:bg-black/[0.03] cursor-pointer flex items-center justify-center gap-2 border py-2 px-4 shadow-sm'>
                    <FcGoogle className='text-3xl'/>
                    <span className='text-md text-gray-700'>Google</span>
                  </div>
            </div>

          </div>
         
    </form>
    </Container>

  );
};

export default LoginForm;
