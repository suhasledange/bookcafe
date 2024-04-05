import React from 'react'

const OrderSkeleton = () => {
  return (<div className='border mb-5 p-3 md:p-5 custom-pulse'>

  <div className='flex justify-between mb-4'>
      <div className='text-md font-semibold text-gray-700 flex items-center gap-1'> <span className=' font-medium bg-gray-300 h-5 w-52 md:w-52 inline-block'></span> </div>

      <div className='md:flex hidden text-gray-700 font-semibold gap-1 items-center'> <span className='font-medium bg-gray-300 h-5 w-36 inline-block'></span> </div>

      <button className='md:hidden block bg-gray-300 text-white text-md active:scale-95 transform duration-200 px-10 py-3'></button>
  </div>

  <div className="flex gap-3 md:gap-5 ">

      <div className="shrink-0 hover:scale-105 duration-200 aspect-square h-36 w-24 md:w-28 bg-gray-300"></div>

      <div className="w-full flex flex-col">
          <div className="flex flex-col md:flex-row justify-between mb-1">
              <div className="text-md md:text-xl font-semibold text-black/[0.8] bg-gray-300 h-6 w-56 md:w-72"></div>
          </div>

          <div className="text-sm md:text-md font-medium text-black/[0.5] bg-gray-300 h-5 w-40 md:w-64"></div>

          <div className="text-sm md:text-md font-bold text-black/[0.8] mt-2 bg-gray-300 h-5 w-24 md:w-32"></div>

          <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">

                  <div className="flex flex-col gap-1">
                      <div className="text-gray-700 font-semibold text-md bg-gray-300 h-5 w-40 md:w-64"></div>
                      <div className='md:hidden text-gray-700 font-semibold flex items-center'><span className='font-medium bg-gray-300 h-5 w-36 inline-block'></span> </div>
                  </div>

              </div>
          </div>
      </div>

      <div className='relative md:block hidden'>
          <button className='absolute bottom-0 right-0 bg-gray-300 text-white text-md active:scale-95 transform duration-200 px-10 py-3'></button>
      </div>
  </div>
</div>
  )
}

export default OrderSkeleton
