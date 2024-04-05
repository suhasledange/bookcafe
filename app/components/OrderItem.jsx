'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
import service from '../appwrite/service'

const OrderItem = ({bookId,payment,paymentMethod,price,quantity,status,DateOfOrder}) => {

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
      
      const formattedDate = formatDate(DateOfOrder);

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
  console.log(book)

  if(loading) return <div>Loading</div>
else return  (
    
    <div className="flex gap-3 md:gap-5 border mb-5 p-5">
            <Link href={`/book/${bookId}`}>
            <div className="shrink-0 hover:scale-105 duration-200 aspect-square w-14 md:w-28">
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
                    <div className="text-lg md:text-xl font-semibold text-black/[0.8]">
                        {book.bookName} <span className='text-sm'> x {quantity}</span> 
                    </div>

                    <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
                        {book.author}
                    </div>

                    <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
                        MRP : &#8377;{price}
                    </div>
                </div>

                <div className="text-md font-medium text-black/[0.5] hidden md:block">
                    {book.author}
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">

                        <div className="flex items-center gap-1">
                            <div>{formattedDate}</div>
                                <button
                                className={` transition-transform active:scale-95 hover:bg-black/[0.8] duration-150 bg-black text-white p-[0.3rem] px-3 tracking-wider`}>Extend</button>

                        </div>
                    </div>
                   icon
                </div>
            </div>
        </div>
  )
}

export default OrderItem
