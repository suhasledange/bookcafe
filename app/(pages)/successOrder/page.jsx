'use client'
import Container from '@/app/components/Container'
import { clearCart } from '@/store/cartSlice'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { VscChromeClose } from 'react-icons/vsc'
import { useDispatch } from 'react-redux'

const SuccessOrder = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearCart())
  }, [])

  return (
    <Container className=" max-w-screen-md -translate-y-20 flex items-center justify-center h-screen">

        <Link href='/' className="w-[80%] bg-green-100 mt-10 flex items-center justify-between border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Order Placed successfully!</strong>
          {/* <span className="block sm:inline">Your paymentID= {paymentid} has been processed.</span> */}
          <VscChromeClose className='text-xl' />
      </Link>

    </Container>

  )
}

export default SuccessOrder
