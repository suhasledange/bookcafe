'use client'
import service from "@/app/appwrite/service";
import Loader from "@/app/components/Loader";
import { loginSlice } from "@/store/authSlice";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const Account = ({ selectedLink}) => {
  const userData = useSelector(state => state.auth.userData)
  const photo = userData?.Img;
  const [loading,setLoading] = useState(false)
  const [addresses, setAddresses] = useState(userData?.address || [""]);
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      userId:userData?.UserId,
      collectionId:userData?.$id,
      name: userData?.name || '',
      phone: userData?.phone || '',
      email: userData?.email || '',
      address: addresses,
      orders:[]
    },
  });


  const addAddressField = () => {
    setAddresses([...addresses, ""]);
  };

  const removeAddressField = (index) => {
    const newAddresses = [...addresses];
    newAddresses.splice(index, 1);
    setAddresses(newAddresses);
  };

  const handleAddressChange = (index, value) => {
    const newAddresses = [...addresses];
    newAddresses[index] = value;
    setAddresses(newAddresses);
  };
  

  const onSubmit = async (formdata) => {

    setLoading(true)
    try {
      
      const formData = { ...formdata, address: addresses };
      const data = await service.updateUserData(formData)
      dispatch(loginSlice({ data }));


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
          <Image priority={true} src={photo ? photo : '/DefaultProfile.svg'} className="rounded-full" width={400} height={400} alt="x" style={{width:"100%", height:"100%", objectFit:"contain"}}/>
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
                  defaultValue={userData?.email}
                  className="mt-1 p-2 text-gray-800 border outline-none rounded-sm border-gray-300 w-full"
                  disabled
                />
                <p className="text-xs text-gray-500">You cannot change your email.</p>
              </div>

              <div className="space-y-2 text-sm">
                  <label
                    htmlFor="address"
                    className="block text-md font-medium text-gray-700"
                  >
                    Address
                  </label>
                  {addresses.map((address, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => handleAddressChange(index, e.target.value)}
                        className="mt-1 p-2 outline-black border rounded-sm border-gray-300 flex-grow mr-2"
                      />
                      {addresses.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeAddressField(index)}
                          className="hover:bg-black/[0.8] text-lg bg-black text-white p-2 px-4 rounded-sm"
                        >
                          -
                        </button>
                      )}
                    </div>
                  ))}
                  <div className="">
                    <button
                      type="button"
                      onClick={addAddressField}
                      className="text-lg bg-black px-4 text-white p-2 hover:bg-black/[0.8] rounded-sm"
                    >
                      +
                    </button>
                  </div>
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
