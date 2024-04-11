'use client'
import { removeFromCart, updateCart } from '@/store/cartSlice';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import service from '../appwrite/service';


const CartItem = ({ Id, Img, bookName, author, price,bookQuantity, quantity }) => {
    const dispatch = useDispatch()
    const [book,setBook] = useState();

    const fetchBook = async ()=>{
        try {
            const res = await service.getBook(Id)
            if(res?.bookQuantity <= 0){
                dispatch(removeFromCart({ id: Id }))
            }
            setBook(res);
        } catch (error) {
            throw error
        }
    }

    useEffect(()=>{
        fetchBook()
    },[])

    const updateCartItem = (e, key) => {
        let payload = {
            key,
            val: key === 'quantity' ? parseInt(e.target.value) : e.target.value,
            id: Id
        }
        dispatch(updateCart(payload))
    }


    return (
        <div className="flex py-5 gap-3 md:gap-5 border-b">
            <Link href={`/book/${Id}`} >
            <div className="shrink-0 hover:scale-105 duration-200 cursor-pointer aspect-square w-14 md:w-32">
                <Image
                className=' drop-shadow-lg'
                alt="cart item"
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
                            <div className="font-semibold">Quantity:</div>
                            <select
                                className="hover:text-black"
                                onChange={(e) => updateCartItem(e, "quantity")}
                                value={quantity}
                            >
                                {Array.from({ length: book?.bookQuantity }, (_, i) => i + 1).map((q, i) => (
                                    <option key={i} value={q}>
                                        {q}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <RiDeleteBin6Line
                        onClick={() => dispatch(removeFromCart({ id: Id }))}
                        className="cursor-pointer text-black/[0.5] hover:text-black text-xl md:text-2xl"
                    />
                </div>
            </div>
        </div>
    )
}

export default CartItem
