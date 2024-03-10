"use client"
import React, { useContext, useEffect, useState } from 'react'
import Container from './Container'
import { BsCart } from "react-icons/bs";
import { IoMenu } from "react-icons/io5";
import { VscChromeClose } from "react-icons/vsc";
import Link from 'next/link'
import { IoSearch } from "react-icons/io5";
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import authService from '../appwrite/auth';
import { logoutSlice } from '@/store/authSlice';
import Image from 'next/image';

const Header = () => {

    const dispatch = useDispatch()

    const userData = useSelector( state=>state.auth.userData )
    const GData = useSelector( state=>state.auth.Gdata )

    const email = GData?.emailAddresses[0]?.value;
    const name =  GData?.names[0]?.displayName;
    const photo =  GData?.photos[0]?.url;

    const handleLogout = async () => {
        await authService.logoutAccount()
        dispatch(logoutSlice())
    }
    const [profileMenu,setProfileMenu] = useState(false)

    const status = useSelector(state => state.auth.status)

    const [mobileMenu, setMobileMenu] = useState(false);

    const { cartItems } = useSelector((state => state.cart))

    return (
        <header className={` shadow-sm w-full h-14 bg-white md:h-20 flex items-center justify-between z-50 sticky top-0 transition-transform duration-300`} >
            <Container className="max-w-screen-xl px-3 md:px-0 h-14 flex justify-between items-center">

                <div className='flex items-center justify-center gap-2'>

                    {/* <div className='flex justify-center items-center cursor-pointer md:hidden'>
                        {
                            mobileMenu ? (
                                <VscChromeClose className='text-2xl' onClick={() => setMobileMenu(false)} />
                            ) : (
                                <IoMenu className=' text-2xl' onClick={() => setMobileMenu(true)} />
                            )
                        }
                    </div> */}

                    <Link href="/">
                        <h1 className='text-md md:text-lg tracking-wider font-bold text-gray-900 '>BookCafe</h1>
                    </Link>
                </div>

                <div className='w-full flex items-center justify-between space-x-4'>

                    <div className='hidden border-b-2 p-1 pb-[0.35rem] gap-2 md:flex flex-[0.8] items-center justify-center mx-auto' >
                        <IoSearch className=' text-gray-600 text-lg' />
                        <input placeholder='Search' className='text-md w-full bg-transparent outline-none' />
                    </div>

                    <div className='font-medium text-sm md:text-lg space-x-3 md:space-x-8 tracking-wide text-gray-700'>
                        <Link href="/book" >Store</Link>
                        <Link href="/about" >About Us</Link>
                    </div>

                </div>

                <div className='flex items-center gap-5 text-black ml-0 md:ml-4'>

                    <Link href="/cart">
                        <div className='w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative'>
                            <BsCart className=' text-base md:text-xl' />

                            <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                                {cartItems.length}
                            </div>

                        </div>
                    </Link>

                    <div className='text-sm md:text-lg flex items-center justify-center'>
                        {
                            !status ?
                                <Link href='/login'>
                                    <Button text="Login" />
                                </Link>
                                :
                                <div className=''>
                                    <div onClick={()=>setProfileMenu(!profileMenu)} className=' w-8 h-8 md:w-10 md:h-10 flex items-center justify-center cursor-pointer rounded-full'>
                                        <Image className='rounded-full' src={GData ? `${photo}` : '/DefaultProfile.svg'} alt="noimg" width={500} height={500} />
                                </div>
                                {
                                    profileMenu === true ? 
                                    <div>
                                    <div onClick={()=> setProfileMenu(false)} className='absolute top-0 left-0 bg-transparent w-full h-screen'>
                                    </div>
                                    <div className='w-60 absolute top-0 md:top-4 mt-[4.7rem] right-4 bg-white py-4 shadow-xl'>
                                        <div className=' flex items-center justify-center flex-col text-center'>
                                            <div className='w-12 h-12 flex items-center justify-center mb-5'>
                                            <Image className='rounded-full' src={GData ? `${photo}` : '/DefaultProfile.svg'} alt="noimg" width={500} height={500} />
                                            </div>
                                            <div className=' space-y-5 w-full '>
                                                <div className=''>
                                                    <h1 className='text-lg font-bold'>{GData ? name : userData?.name}</h1>
                                                    <h3 className='text-sm font-thin'>{GData ? email : userData?.email}</h3>
                                                </div>
                                                <div className='py-1 border-t border-b w-full text-lg hover:bg-black/[0.03]'>
                                                    <Link onClick={()=>setProfileMenu(false)} href="/profile">Profile</Link>
                                                </div>

                                            </div>
                                            <div onClick={handleLogout} className='mt-5 mb-3'>
                                                <Button text="Logout" />
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                    : ""
                                }
                                </div>
                        }

                    </div>

                </div>



            </Container>
        </header>
    )
}

export default Header
