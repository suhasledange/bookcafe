'use client'
import Loader from "@/app/components/Loader";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const Account = ({ selectedLink}) => {
  const GData = useSelector(state => state.auth.Gdata)
  const userData = useSelector(state => state.auth.userData)
  const photo = GData?.photos[0]?.url;
  const [loading,setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      name: userData?.name || '',
      phone: userData?.phone || '',
      email: userData?.email || '',
      address: [],
    },
  });
  
  const router = useRouter();

  const onSubmit = async (data) => {

    console.log(data)
  setLoading(true)

  try {



  } catch (error) {
    console.log('invalid')
  } finally {
    setLoading(false);
  }
}


  return (
    selectedLink === 1 &&
    <div className=" space-y-8">
        <div className=" w-40 h-40">
          <Image src={photo ? photo : '/DefaultProfile.svg'} className="rounded-full" width={400} height={400} alt="x" style={{width:"100%", height:"100%", objectFit:"contain"}}/>
        </div>
        <div className=" p-2">
          <h1 className="text-xl font-bold text-gray-700 mb-8">Contact Details</h1>
          <div>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md">
        <div className="flex flex-col space-y-5 ">

          <div className=' space-y-2 text-sm'>
            <label htmlFor="name" className="block text-md font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register('name', { required: true })}
              className="mt-1 p-2 outline-black border rounded-sm border-gray-300 w-full"
            />
            {errors.name?.type === "required" && (
              <p role="alert" className='text-sm text-red-800 font-light'>Full Name is required</p>
            )}
          </div>

          <div className=' space-y-2 text-sm'>
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

              className="mt-1 p-2 outline-black border rounded-sm border-gray-300 w-full"
            />
            {errors.phone && (
              <p role="alert" className='text-sm text-red-800 font-light'>{errors.phone.message}</p>
            )}
          </div>

          <div className='space-y-2 text-sm'>
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
              className="mt-1 p-2 border outline-black rounded-sm border-gray-300 w-full"
            />
            {errors.email && (
              <p role="alert" className='text-sm text-red-800 font-light'>{errors.email.message}</p>
            )}
          </div>

          <div className='space-y-2'>
            <label htmlFor="address" className="block text-md font-medium text-gray-700">
              Address
            </label>
            <input
              type="address"
              id="address"
              {...register('address', {
              })}
              className="mt-1 p-2 outline-black border rounded-sm border-gray-300 w-full"
            />
          </div>

          <div>
            <button
              type="submit"
              className="text-md gap-3 flex items-center justify-center  bg-black text-white p-2 rounded-sm w-full hover:bg-black/[0.9] transition duration-150"
            >
              Save Changes {loading ? <Loader className1="border-white w-6 h-6 "/> :""}
            </button>
          </div>
         
        </div>

      </form>

          </div>
        </div>
    </div>
  )
}

export default Account
