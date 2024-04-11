"use client"
import React, { useEffect, useRef, useState } from 'react'
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
import { FaStore } from "react-icons/fa";
import {  IoMdHeartEmpty, IoMdInformationCircleOutline } from "react-icons/io";
import { useDebounce } from '../hooks/hook';
import service from '../appwrite/service';
import Skeleton from 'react-loading-skeleton';

const Header = () => {

    const dispatch = useDispatch()

    const userData = useSelector(state => state.auth.userData)
    const photo = userData?.Img;

    const [profileMenu, setProfileMenu] = useState(false)

    const status = useSelector(state => state.auth.status)

    const [mobileMenu, setMobileMenu] = useState(false);
    const [loading, setLoading] = useState(false)
    const { cartItems } = useSelector((state => state.cart))
    const { wishItems } = useSelector((state => state.wish))

    const [search, setSearch] = useState(false)

    const [searchResult, setSearchResult] = useState([])
    const [inputSearch, setInputSearch] = useState("")
    const links = [
        { id: 1, text: "Store", href: '/book', icon: <FaStore className='text-xl' /> },
        { id: 2, text: "About Us", href: '/about', icon: <IoMdInformationCircleOutline className='text-xl' /> },
    ]

    const debounce = useDebounce(inputSearch)
    useEffect(() => {

        const loadBooks = async () => {
            setLoading(true)

            if (debounce.trim() !== "") {
                const data = await service.getBooksBySearch(debounce);
                setSearchResult(data.documents);
            }

            setLoading(false)
        }

        loadBooks()

    }, [debounce])

    const ref = useRef(null);
    const ref1 = useRef(null)


    const handleLogout = async () => {
        await authService.logoutAccount()
        dispatch(logoutSlice())
    }

    const clearSearch = () => {
        setInputSearch("")
        ref.current.value = ""
        ref1.current.value = ""
    }

    const handleClick = () => {
        setMobileMenu(false);
        setSearch(!search)
    }

    return (
        <>
            <header className={`shadow-sm w-full duration-200 py-3 md:py-2 h-full justify-center gap-3 bg-white flex flex-col items-center z-40 sticky top-0 transition-transform`} >

                <Container className="bg-white z-40 max-w-screen-xl flex justify-between h-full items-center md:py-0 relative">


                    <div className='flex items-center justify-center gap-2'>

                        <div className='flex justify-center items-center cursor-pointer md:hidden'>
                            {
                                mobileMenu ? (
                                    <VscChromeClose className='text-xl' onClick={() => setMobileMenu(false)} />
                                ) : (
                                    <IoMenu className=' text-xl' onClick={() => setMobileMenu(true)} />
                                )
                            }
                        </div>

                        <Link onClick={() => setMobileMenu(false)} href="/">
                            <h1 className='text-md md:text-lg tracking-wider font-bold text-gray-900 '>BookCafe</h1>
                        </Link>
                    </div>


                    {/* mobile */}


                    <div className={`md:hidden transform duration-200 ${mobileMenu ? "translate-x-0" : " -translate-x-full "} absolute top-[100%] mt-3 w-4/6 left-0 h-screen `}>

                        <div className='h-screen z-40 bg-white flex flex-col pt-5 border-t px-4 items-start justify-start font-medium text-md tracking-wide text-gray-700 space-y-5'>

                            {
                                links.map(link => (
                                    <div key={link.id} className='group w-full'>
                                        <Link onClick={() => setMobileMenu(false)} className=' flex items-center justify-start gap-2 text-gray-900  border-b w-full py-2' href={link.href} >{link.icon} {link.text}</Link>
                                        <div className=' animate-bounce duration-300 group-hover:w-[91%] w-[0%] bg-black h-[2.5px] absolute'></div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div onClick={() => setMobileMenu(false)} className={`md:hidden ${mobileMenu ? "w-full" : "w-0"} h-screen absolute top-[100%] left-0 bg-transparent -z-50`}>
                    </div>

                    {/* desktop search */}


                    <div className='hidden w-full md:flex items-center justify-between'>

                        <div className=' border-b-2 p-1 pb-[0.35rem] gap-2 md:flex flex-[0.8] items-center justify-center mx-auto relative' >
                            <IoSearch className=' text-gray-600 text-lg' />
                            <input ref={ref1} onChange={(e) => setInputSearch(e.target.value)} placeholder='Search' className='text-md w-full bg-transparent outline-none' />
                            {
                                inputSearch.trim() !== "" && (
                                    loading ? <div className='z-50 absolute w-full top-12 mt-1 rounded-md p-4 left-0 shadow-xl bg-white space-y-2'>
                                        <div className='w-full h-full animate-pulse bg-gray-200'> <Skeleton /> </div>
                                        <div className='w-full h-full animate-pulse bg-gray-200'> <Skeleton /> </div>
                                    </div> :
                                        searchResult.length ?
                                            <div className='z-50 absolute w-full top-12 mt-1 rounded-md p-4 left-0 shadow-xl bg-white'>
                                                {
                                                    searchResult?.map(res => (
                                                        <Link key={res.$id} onClick={clearSearch} className='flex items-center justify-start gap-2 w-full text-sm text-gray-700 p-2 hover:bg-gray-100' href={`/book/${res.$id}`}>

                                                            <IoSearch className=' shrink-0 text-md' /> {res.bookName} by {res.author}

                                                        </Link>
                                                    ))
                                                }
                                            </div> : ""
                                )
                            }

                        </div>

                        <div className='font-medium text-md flex gap-5  tracking-wide text-gray-800'>
                            {
                                links.map(link => (
                                    <Link className='flex items-center gap-2 hover:text-black' key={link.id} href={link.href} >{link.icon} {link.text}</Link>

                                ))
                            }

                        </div>

                    </div>



                    {/* Desktop */}


                    <div className='flex items-center gap-2 text-black ml-0 md:ml-4'>

                        <IoSearch onClick={handleClick} className=' text-gray-600 text-lg cursor-pointer md:hidden' />

                        <Link href="/wishlist">
                            <div className='w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative'>
                                <IoMdHeartEmpty onClick={() => setMobileMenu(false)} className=' text-xl md:text-2xl' />

                                <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                                    {wishItems.length}
                                </div>

                            </div>
                        </Link>

                        <Link href="/cart" className='mr-2'>
                            <div className='w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative'>
                                <BsCart onClick={() => setMobileMenu(false)} className=' text-base md:text-xl' />

                                <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                                    {cartItems.length}
                                </div>

                            </div>
                        </Link>



                    {/* profile /login  */}

                        <div className='text-sm md:text-lg flex items-center justify-center'>
                            {
                                !status ?
                                    <Link onClick={() => setMobileMenu(false)} href='/login'>
                                        <Button text="Login" />
                                    </Link>
                                    :
                                    <div className=''>
                                        <div onClick={() => setProfileMenu(!profileMenu)} className=' w-8 h-8 md:w-10 md:h-10 flex items-center justify-center cursor-pointer rounded-full'>
                                            <Image className='rounded-full' src={photo ? `${photo}` : '/DefaultProfile.svg'} alt="noimg" width={500} height={500} />
                                        </div>
                                        {
                                            profileMenu === true ?
                                                <div>
                                                    <div onClick={() => setProfileMenu(false)} className='absolute top-0 left-0 bg-transparent w-full h-screen'>
                                                    </div>
                                                    <div className='w-60 absolute top-0 md:top-4 mt-[4.7rem] right-4 bg-white py-4 shadow-xl'>
                                                        <div className=' flex items-center justify-center flex-col text-center'>
                                                            <div className='w-12 h-12 flex items-center justify-center mb-5'>
                                                                <Image className='rounded-full' src={photo ? `${photo}` : '/DefaultProfile.svg'} alt="noimg" width={500} height={500} />
                                                            </div>
                                                            <div className=' space-y-5 w-full '>
                                                                <div className=''>
                                                                    <h1 className='text-lg font-bold'>{userData?.name}</h1>
                                                                    <h3 className='text-sm font-thin'>{userData?.email}</h3>
                                                                </div>
                                                                <div className='py-1 border-t border-b w-full text-lg hover:bg-black/[0.03]'>
                                                                    <Link onClick={() => setProfileMenu(false)} href="/profile">Profile</Link>
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


                            {/* mobile search */}

                <div className={`${search ? "block" : "hidden"} md:hidden border-2 mx-auto rounded-md px-2 py-1 gap-2 flex w-[96%] items-center justify-center relative`}>
                    <IoSearch className=' text-gray-600 text-lg' />
                    <input ref={ref} onChange={(e) => setInputSearch(e.target.value)} placeholder='Search' className='text-md w-full bg-transparent outline-none' />
                    {
                        inputSearch.trim() !== "" && (
                            loading ? <div className='z-50 absolute w-full top-12 mt-1 rounded-md p-4 left-0 shadow-xl bg-white space-y-2'>
                                <div className='w-full h-full animate-pulse bg-gray-200'> <Skeleton /> </div>
                                <div className='w-full h-full animate-pulse bg-gray-200'> <Skeleton /> </div>
                            </div> :
                                searchResult.length ?
                                    <div className='z-50 absolute w-full top-12 mt-1 rounded-md p-4 left-0 bg-white shadow-xl'>
                                        {
                                            searchResult?.map(res => (
                                                <Link key={res.$id} onClick={clearSearch} className=' flex items-center justify-start gap-2 w-full text-sm text-gray-700 p-2 hover:bg-gray-100' href={`/book/${res.$id}`}>

                                                    <IoSearch className='text-md shrink-0' /> {res.bookName} by {res.author}

                                                </Link>
                                            ))
                                        }
                                    </div> : ""
                        )
                    }
                </div>

            </header>
        </>
    )
}

export default Header
