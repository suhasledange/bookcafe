'use client'
import Image from "next/image"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { addToCart } from "@/store/cartSlice"
import { toast } from "react-toastify"

const Book = ({ Id, author, Img, availability, bookName, description, genre, rentPrice }) => {

  const dispatch = useDispatch();

  const notify = () => {
    toast.success('Book Added To Cart', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <div className="overflow-hidden w-44 bg-white mx-auto py-3 flex flex-col items-center justify-center">
      <Link
        href={`/book/${Id}`}
      >
        <div className=" w-44 h-48 drop-shadow-xl transform duration-150 hover:scale-105 mx-auto">
          <Image priority={true} alt="image not found" style={{ width: "100%", height: "100%", objectFit: 'contain' }} src={Img} width={350} height={350} />
        </div>

        <div className=" text-black/[0.9] flex items-center justify-center flex-col">
          <h2 className="mt-3 text-sm font-medium">{bookName?.slice(0, 15)}...</h2>
          <p className="text-center mb-1 text-gray-700">{author?.slice(0, 16)}</p>
          <div className="flex justify-center items-center text-black/[0.7] mt-2 mb-4">
            <div className="flex items-center justify-center">
              <p className="text-lg font-semibold ">
                &#8377;{rentPrice}
              </p>
              {/* <p className="text-base text-red-600  font-medium line-through">
                 30
            </p> */}
            </div>
            {/* <p className="text-green-700 font-medium">
                30%
              </p> */}
          </div>
        </div>
      </Link>
      <button
        onClick={() => {
          dispatch(addToCart({
            Id,
            Img,
            bookName,
            author,
            price: rentPrice,
            oneQuantityPrice: rentPrice
          }))
          notify()
        }}
        disabled={!availability} className={`${availability ? "transition-transform active:scale-95" : " cursor-not-allowed"} hover:bg-black/[0.8] duration-150 bg-black text-white p-[0.3rem] px-3 tracking-wider`}>{availability ? "Add To Cart" : "Out of Stock"}</button>
    </div>
  )
}
export default Book
