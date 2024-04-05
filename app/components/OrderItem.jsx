'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
import service from '../appwrite/service'
import OrderSkeleton from './OrderSkeleton'

const OrderItem = ({ bookId, payment, paymentMethod, price, quantity, status, DateOfOrder ,DeliveredDate}) => {

    const [book, setBook] = useState(null);

    const [loading, setLoading] = useState(true);


    function formatDate(dateString) {
        const dateObject = new Date(dateString);
        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();
        const formattedDate = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
        return formattedDate;
    }

    const fetchData = useMemo(
        () => async () => {
            try {
                const res = await service.getBook(String(bookId));
                setBook(res);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data from the server:", error);
                setLoading(false);
            }
        },
        [bookId]
    );
    useEffect(() => {

            const fetchDataFunction = fetchData();
            fetchDataFunction.then();
    
    }, [fetchData]);

    if (loading) return <div>
            <OrderSkeleton/>
        </div>
    else return (
        <div className='border mb-5 p-3 md:p-5'>

            <div className='flex justify-between mb-4'>
                <div className='text-md font-semibold text-gray-700'>Order Date : <span className=' font-medium'>{formatDate(DateOfOrder)}</span> </div>
              
                <div className='md:block hidden text-gray-700 font-semibold'>Payment : <span className={`font-medium ${payment ==='complete' ? "text-green-600" : "text-red-600"} `}>{payment}</span> </div>

                <button className='md:hidden block bg-black text-white px-3 text-sm active:scale-95 transform duration-200 p-[0.35rem]'>Extend</button>
                
              

            </div>

            <div className="flex gap-3 md:gap-5 ">

                <Link href={`/book/${bookId}`}>
                    <div className="shrink-0 hover:scale-105 duration-200 aspect-square w-24 md:w-28">
                        <Image
                            className='drop-shadow-lg'
                            alt="wish item"
                            src={book?.bookImg}
                            width={500}
                            height={500}
                        />
                    </div>
                </Link>

                <div className="w-full flex flex-col">
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="text-md md:text-xl font-semibold text-black/[0.8]">
                            {book.bookName} <span className='text-sm font-medium'> x{quantity}</span>
                        </div>

                    </div>

                    <div className="text-sm md:text-md font-medium text-black/[0.5]">
                        {book.author}
                    </div>

                    <div className="text-sm md:text-md font-bold text-black/[0.8] mt-2">
                            MRP : &#8377;{price}
                        </div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">

                            <div className="flex flex-col gap-1">
                               {
                                status === "IN_TRANSIT" ?
                               <div className="text-red-600 font-semibold">{status}</div>
                                   
                               :
                               <div className='text-gray-700 font-semibold text-md'> Due Date : <span className='text-red-600 font-medium'> {formatDate(DeliveredDate)} </span></div>
                               
                            }
                            <div className='md:hidden text-gray-700 font-semibold'>Payment : <span className={`font-medium ${payment ==='complete' ? "text-green-600" : "text-red-600"} `}>{payment}</span> </div>
                            </div>

                        </div>
                    </div>
                </div>
            
            
             <div className='relative md:block hidden'>
              
                <button className='absolute bottom-0 right-0 bg-black text-white px-[0.85rem] text-md active:scale-95 transform duration-200 p-[0.35rem]'>Extend</button>
                
                </div>     
            </div>
           
        </div>

    )
}

export default OrderItem
