// LoginForm.js
'use client'
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Container from '@/app/components/Container';

const LoginForm = () => {
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

        <div className="text-left">
          <Link href="#" className=' text-sm'>
            Forgot your Password?
          </Link>
        </div>

        <div>
          <button
            type="submit"
            className="text-lg bg-black text-white p-3 rounded-sm w-full hover:bg-black/[0.9] transition duration-150"
          >
            Login
          </button>
        </div>
        <div>
            <h2 className=' text-gray-700'>Don't have an account yet ? <Link href='/signup' className='hover:text-gray-900 duration-100 underline underline-offset-2'>Create account</Link> </h2>
        </div>
      </div>
    </form>
    </Container>

  );
};

export default LoginForm;
