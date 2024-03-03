import Image from "next/image"
import Link from "next/link"
import Button from "./Button"

const Book = ({Id,author,Img,availability,bookName,description,genre,rentPrice}) => {

  return (
    <Link
    href={`/book/${Id}`}
    className="overflow-hidden w-44 bg-white mx-auto py-3"  
>
   <div className=" w-44 h-48 drop-shadow-xl transform duration-150 hover:scale-105 mx-auto">
          <Image alt="image not found" style={{width:"100%", height:"100%",objectFit:'contain'}} src={Img} width={1000} height={1000}  />
   </div>

    <div className=" text-black/[0.9] flex items-center justify-center flex-col">
        <h2 className="mt-3 text-sm font-medium">{bookName?.slice(0,15)}...</h2>
        <p className="text-center mb-1 text-gray-700">{author?.slice(0,16)}</p>
        <div className="flex justify-center items-center text-black/[0.5] mt-2 mb-4">
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
            <Button text={availability ? "Add To Cart" : "Out of Stock"} className="py-1 px-4"/>
    </div>
</Link>

  )
}

export default Book
