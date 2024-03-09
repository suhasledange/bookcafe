// SignupForm.js
'use client'
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Container from '@/app/components/Container';
import authService from '@/app/appwrite/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Loader from '@/app/components/Loader';
import { useSelector } from 'react-redux';
import { FcGoogle } from 'react-icons/fc';

const SignupForm = () => {

  const [loading,setLoading] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const router = useRouter();

  const status = useSelector(state => state.auth.status)
  if(status) router.push('/')

  const onSubmit = async (data) => {

    data.phone = `+91${data.phone}`

    setLoading(true)

    try {
        const {userId} = await authService.createAccount(data);
        if(userId) router.push('/checkemail')

    } catch (error) {
      console.log('invalid')
    } finally {
      reset();
      setLoading(false);
    }
    reset();
  };

  const LoginWithGoogle = async()=>{
    await authService.LoginWithGoogle()
}

  return (
    <Container className="md:px-0 px-3 max-w-screen-xl mt-10 mb-10">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className="flex flex-col space-y-4">

          <div className=' space-y-2'>
            <label htmlFor="name" className="block text-md font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              {...register('name', { required: true })}
              className="mt-1 p-3 outline-black border rounded-sm border-gray-300 w-full"
            />
            {errors.name?.type === "required" && (
              <p role="alert" className='text-sm text-red-800 font-light'>Full Name is required</p>
            )}
          </div>

          <div className=' space-y-2'>
            <label htmlFor="phone" className="block text-md font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              {...register('phone', {
                required: "Phone Number is required.",
                pattern: {
                  value: /^\d{10}$/,
                  message: 'Phone Number should be 10 digits',
                },
              },
              )}

              className="mt-1 p-3 outline-black border rounded-sm border-gray-300 w-full"
            />
            {errors.phone && (
              <p role="alert" className='text-sm text-red-800 font-light'>{errors.phone.message}</p>
            )}
          </div>



          <div className='space-y-2'>
            <label htmlFor="email" className="block text-md font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                  message: 'Enter a valid email address',
                },
              })}
              className="mt-1 p-3 border outline-black rounded-sm border-gray-300 w-full"
            />
            {errors.email && (
              <p role="alert" className='text-sm text-red-800 font-light'>{errors.email.message}</p>
            )}
          </div>

          <div className='space-y-2'>
            <label htmlFor="password" className="block text-md font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password', {
                required: 'Password is required',
                pattern: {
                  value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
                  message: 'Password must contain a character, symbol, and number, and be at least 8 characters long',
                },
              })}
              className="mt-1 p-3 outline-black border rounded-sm border-gray-300 w-full"
            />
            {errors.password && (
              <p role="alert" className='text-sm text-red-800 font-light'>{errors.password.message}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="text-lg gap-3 flex items-center justify-center  bg-black text-white p-3 rounded-sm w-full hover:bg-black/[0.9] transition duration-150"
            >
              Sign Up {loading ? <Loader className1="border-white w-6 h-6 "/> :""}
            </button>
          </div>
          <div>
            <h2 className=' text-gray-700'>Already have an account? <Link href='/login' className='hover:text-gray-900 duration-100 underline underline-offset-2'>Login</Link></h2>
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

export default SignupForm;
