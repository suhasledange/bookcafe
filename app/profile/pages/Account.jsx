'use client'
import Image from "next/image";
import { useSelector } from "react-redux";

const Account = ({ selectedLink}) => {
  const GData = useSelector(state => state.auth.Gdata)
  const email = GData?.emailAddresses[0]?.value;
  const name = GData?.names[0]?.displayName;
  const photo = GData?.photos[0]?.url;
  return (
    selectedLink === 1 &&
    <div className=" space-y-8">
        <div className=" w-40 h-40">
          <Image src={photo} className="rounded-full" width={400} height={400} style={{width:"100%", height:"100%", objectFit:"contain"}}/>
        </div>
        <div className=" border p-2">
          <h1 className="text-xl font-bold text-gray-700">Contact Details</h1>
          <div>
              

          </div>
        </div>
    </div>
  )
}

export default Account
