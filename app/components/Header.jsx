"use client"
import React, { useState } from 'react'
import Container from './Container'
import { BsCart } from "react-icons/bs";
import { IoMenu } from "react-icons/io5";
import { VscChromeClose } from "react-icons/vsc";
import Link from 'next/link'
import { IoSearch } from "react-icons/io5";
import Button from './Button';


const Header = () => {
    const [mobileMenu, setMobileMenu] = useState(false);

    return (
        <header className={` shadow-sm w-full h-14 bg-white md:h-20 flex items-center justify-between z-50 sticky top-0 transition-transform duration-300`}>
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
                
                <div className='hidden border-b-2 p-1 pb-[0.35rem] gap-2 md:flex flex-[0.8] items-center justify-center mx-auto'>
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
                                4
                            </div>
                        </div>
                    </Link>
                    <Link href="/login" className='text-sm md:text-lg flex items-center justify-center'>
                      <Button text="Login"/>
                    </Link>

                </div>



            </Container>
        </header>
    )
}

export default Header
