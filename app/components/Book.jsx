import Image from "next/image"
import Link from "next/link"
import Button from "./Button"

const Book = ({Img}) => {
  return (
    <div className=" w-40 h-auto mx-auto">
    <Link
    href="/book/b1"
    className="overflow-hidden bg-white"  
>
   <div className=" w-40 h-48 transform duration-150 hover:scale-105">
          <Image alt="image not found" style={{width:"100%", height:"100%",objectFit:'contain'}} src={Img} width={1000} height={1000}  />
   </div>

    <div className=" text-black/[0.9] flex flex-col">
        <h2 className="mt-3 text-lg font-medium">The Lean Startup</h2>
        <p className="text-center mb-1 text-gray-700">Ron Chenow</p>
        <div className="flex justify-between items-center text-black/[0.5] mt-2 mb-4">
            <div className="flex items-center">
            <p className="mr-2 text-lg font-semibold">
              20
            </p>
            <p className="text-base text-red-600  font-medium line-through">
                 30
            </p>
            </div>
              <p className="text-green-700 font-medium">
                30%
              </p>
        </div>
            <Button text="Add To Cart" className="py-1 px-4"/>
    </div>
</Link>
</div>

  )
}

export default Book
