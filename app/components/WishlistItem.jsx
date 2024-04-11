'use client'

import { ToastContext } from '@/context/ToastContext';
import { addToCart } from '@/store/cartSlice';
import { removeFromWish } from '@/store/wishSlice';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import service from '../appwrite/service';
import { useSelector } from "react-redux";

const WishlistItem = ({ Id, Img, bookName, author, price,availability,bookQuantity }) => {
    const dispatch = useDispatch()
    const {cartItems} = useSelector((state => state.cart))
    const [book,setBook] = useState();

    const canAddToCart = () => {
    
        const totalQuantityInCart = cartItems.reduce((total, item) => {
          if (item.Id === Id) {
            return total + item.quantity;
          }
          return total;
        }, 0);
    
        return totalQuantityInCart < book?.bookQuantity;
      };
    
      let isAvaiable = canAddToCart()
    

    const fetchBook = async ()=>{
        try {
            const res = await service.getBook(Id)
            setBook(res);
        } catch (error) {
            throw error
        }
    }

    useEffect(()=>{
        fetchBook()
    },[])

  const { notifyCart} = useContext(ToastContext)

    return (
        <div className="flex py-5 gap-3 md:gap-5 border-b">
            <Link href={`/book/${Id}`}>
            <div className="shrink-0 hover:scale-105 duration-200 aspect-square w-14 md:w-32">
                <Image
                className='drop-shadow-lg'
                alt="wish item"
                src={Img}
                width={500}
                height={500}
                />
            </div>
        </Link>

            <div className="w-full flex flex-col">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
                        {bookName}
                    </div>

                    <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
                        {author}
                    </div>

                    <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
                        MRP : &#8377;{price}
                    </div>
                </div>

                <div className="text-md font-medium text-black/[0.5] hidden md:block">
                    {author}
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">

                        <div className="flex items-center gap-1">
                            {
                                book?.availability ?
                                <button
                                onClick={() => {

                                    if(canAddToCart()){
                                    dispatch(addToCart({
                                        Id,
                                        Img,
                                        bookName,
                                        author,
                                        price: price,
                                        availability:book?.availability,
                                        oneQuantityPrice: price,
                                        bookQuantity:book?.bookQuantity
                                    }))
                                    notifyCart()
                                }
                                }}
                                 disabled={!book?.availability || !canAddToCart()}
                                className={`${isAvaiable ? "transition-transform active:scale-95" : " cursor-not-allowed"} hover:bg-black/[0.8] duration-150 bg-black text-white p-[0.3rem] px-3 tracking-wider`}>Add To Cart</button>

                               : <h1 className='text-red-700 text-lg font-semibold'>Out of Stock</h1> 
                            }

                        </div>
                    </div>
                    <RiDeleteBin6Line
                        onClick={() => dispatch(removeFromWish({ id: Id }))}
                        className="cursor-pointer text-black/[0.5] hover:text-black text-xl md:text-2xl"
                    />
                </div>
            </div>
        </div>
    )
}

export default WishlistItem
