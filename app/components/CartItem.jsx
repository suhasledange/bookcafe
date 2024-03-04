'use client'
import Image from 'next/image';
import { RiDeleteBin6Line } from "react-icons/ri";


const CartItem = ({data}) => {
  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
    <div className="shrink-0 aspect-square w-14 md:w-32">
        <Image
        alt="cart item"
            src='/temp2.webp'
            width={500}
            height={500}
        />
    </div>

    <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
            <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
                Book Name
            </div>

            <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
                Author
            </div>

            <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
                MRP : &#8377;1234
            </div>
        </div>

        <div className="text-md font-medium text-black/[0.5] hidden md:block">
                 Author
        </div>

        <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
               
                <div className="flex items-center gap-1">
                    <div className="font-semibold">Quantity:</div>
                    <select
                        className="hover:text-black"
                        // onChange={(e)=>updateCartItem(e,"quantity")}
                    >
                        {Array.from({length:10},(_,i)=>i+1).map((q,i)=>(
                            <option key={i} value={q}
                            selected={data.quantity===q}
                            >
                            {q}
                        </option>
                            ))}
                    </select>
                </div>
            </div>
            <RiDeleteBin6Line
            //    onClick={()=>dispatch(removeFromCart({id:data.id}))}
                className="cursor-pointer text-black/[0.5] hover:text-black text-xl md:text-2xl"
            />
        </div>
    </div>
</div>
  )
}

export default CartItem
