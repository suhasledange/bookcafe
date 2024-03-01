import Image from "next/image"
import Link from "next/link"
import Button from "./Button"

const Book = ({Img}) => {
  return (
    <Link
    href="/"
    className="overflow-hidden bg-white border border-white" 
>
   <div className=" w-40 h-48 transform duration-150 hover:scale-105">
    <Image className=" w-full h-full object-cover" src={Img} width={1000} height={1000}  />
   </div>

    <div className=" text-black/[0.9]">
        <h2 className="mt-3 text-lg font-medium">The Lean Startup</h2>
        <p className="text-center mb-4 text-gray-700">Ron Chenow</p>
        <div className="flex justify-between items-center text-black/[0.5]">
            <div className="flex items-center">
            <p className="mr-2 text-lg font-semibold">
              20
            </p>
            <p className="text-base text-red-600  font-medium line-through">
                 30
            </p>
            </div>
            <Button text="Rent" className="py-1 px-4"/>

        </div>
    </div>
</Link>
  )
}

export default Book
