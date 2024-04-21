'use client'
import React, { useContext, useState } from 'react'
import Container from '../components/Container'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ToastContext } from '@/context/ToastContext';
import service from '../appwrite/service';
import Loader from '../components/Loader';

const Feedback = () => {

    const [loading,setLoading] = useState(false)

    const { register, handleSubmit, reset, formState: {errors} } = useForm();
    const router = useRouter()

    const { notifyToast} = useContext(ToastContext)


    const onSubmit = async (data)=>{

        try {
            setLoading(true)
            const res = await service.submitFeedback(data);
            if(res){
                notifyToast("Submitted Successfuly!",1500)
            }

        } catch (error) {
            console.log("error submitting",error)
        }finally{
            setLoading(false)
            reset()
        }

    }

  return (
    <Container className=" max-w-screen-xl py-10">
       <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto">
       <div className='mb-8 text-center'>
        <h1 className='text-3xl font-bold mb-1'>How can we improve?</h1>
        <p className='text-sm text-gray-700 '>Your feedback is important to us.</p>
        <p className='text-sm text-gray-700'> Please be honest and tell us what you think.</p>
        </div>
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
            <label htmlFor="message" className="block text-md font-medium text-gray-700">
              Message
            </label>
            <textarea
              cols={7}
              rows={7}
              type="text"
              id="message"
              {...register('message', {
                required: 'Message is required',
              })}
              className="mt-1 p-3 border resize-none outline-black rounded-sm border-gray-300 w-full"
            />
            {errors.message && (
              <p role="alert" className='text-sm text-red-800 font-light'>{errors.message.message}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="text-lg gap-3 flex items-center justify-center  bg-black text-white p-3 rounded-sm w-full hover:bg-black/[0.9] transition duration-150"
            >
              Submit {loading ? <Loader className1="border-white w-6 h-6 "/> :""}
            </button>
          </div>
        
        </div>


      </form>
    </Container>
  )
}

export default Feedback
