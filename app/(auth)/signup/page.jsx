// SignupForm.js
'use client'
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Container from '@/app/components/Container';
import { conf } from '@/app/util/conf';

const SignupForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  
  return (
    <Container className="md:px-0 px-3 max-w-screen-xl mt-10 mb-10">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className="flex flex-col space-y-4">
          
        <div className=' space-y-2'>
            <label htmlFor="name" className="block text-md font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register('name', { required: 'First Name is required' })}
              className="mt-1 p-3 border rounded-sm border-gray-300 w-full"
            />
          </div>

          <div className=' space-y-2'>
            <label htmlFor="phone" className="block text-md font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              {...register('phone', { required: 'Phone Number is required' })}
              className="mt-1 p-3 border rounded-sm border-gray-300 w-full"
            />
          </div>

          <div className=' space-y-2'>
            <label htmlFor="email" className="block text-md font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email', { required: 'Email is required' })}
              className="mt-1 p-3 border rounded-sm border-gray-300 w-full"
            />
          </div>

          <div className=' space-y-2'>
            <label htmlFor="password" className="block text-md font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password', { required: 'Password is required' })}
              className="mt-1 p-3 border rounded-sm border-gray-300  w-full"
            />
          </div>

          <div>
            <button
              type="submit"
              className="text-lg bg-black text-white p-3 rounded-sm w-full hover:bg-black/[0.9] transition duration-150"
            >
              Sign Up
            </button>
          </div>
          <div>
            <h2 className=' text-gray-700'>Already have an account? <Link href='/login' className='hover:text-gray-900 duration-100 underline underline-offset-2'>Login</Link></h2>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default SignupForm;
