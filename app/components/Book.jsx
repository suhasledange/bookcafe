'use client'
import Image from "next/image"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { addToCart } from "@/store/cartSlice"
import { useContext } from "react"
import { ToastContext } from "@/context/ToastContext"
import { useSelector } from "react-redux";
const Book = ({ Id, author, Img, availability, bookName, rentPrice,bookQuantity }) => {

  const dispatch = useDispatch();
  const {notifyToast} = useContext(ToastContext)
  
  const {cartItems} = useSelector((state => state.cart))

  const canAddToCart = () => {
    
    const totalQuantityInCart = cartItems.reduce((total, item) => {
      if (item.Id === Id) {
        return total + item.quantity;
      }
      return total;
    }, 0);

    return totalQuantityInCart < bookQuantity;
  };

  let isAvaiable = canAddToCart()

  return (
   
    <div className="overflow-hidden w-44 bg-white mx-auto py-3 flex flex-col items-center justify-center">
      <Link
        href={`/book/${Id}`}
      >
        <div className=" w-44 h-48 drop-shadow-xl transform duration-150 hover:scale-105 mx-auto">
          <Image priority={true} alt="image not found" style={{ width: "100%", height: "100%", objectFit: 'contain' }} src={Img} width={350} height={350} />
        </div>

        <div className=" text-black/[0.9] flex items-center justify-center flex-col">
          <h2 className="mt-3 text-sm font-medium">{bookName?.length > 14 ? bookName?.slice(0, 15) + "..." : bookName} </h2>
          <p className="text-center mb-1 text-gray-700">{author?.slice(0, 16)}</p>
        </div>

      </Link>

      <div className="flex justify-center items-center text-black/[0.7] mt-2 mb-4 w-full">
        <div className="flex items-center justify-evenly w-full">
          <p className="text-lg font-semibold ">
            &#8377;{rentPrice}
          </p>
        </div>
      </div>

      <button
          onClick={() => {
            if (canAddToCart()) {
              dispatch(
                addToCart({
                  Id,
                  Img,
                  bookName,
                  author,
                  price: rentPrice,
                  availability,
                  oneQuantityPrice: rentPrice,
                  bookQuantity: bookQuantity,
                })
              );
              notifyToast("Book added to cart",1500);
            }
          }}
          disabled={!availability || !canAddToCart()}
          className={`${isAvaiable ? "transition-transform active:scale-95" : "cursor-not-allowed"} hover:bg-black/[0.8] duration-150 bg-black text-white p-[0.3rem] px-5 tracking-wider`}
        >
          {availability ? "Add To Cart" : "Out of Stock"}
        </button>
    </div>
  )
}
export default Book
