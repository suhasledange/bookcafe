'use client'
import service from "@/app/appwrite/service";
import Container from "@/app/components/Container";
import Loader from "@/app/components/Loader";
import Image from "next/image";
import { useEffect, useState } from "react";

const page = ({params}) => {

  const [book,setBook] = useState(null)
  const [loading,setLoading] = useState(true)

    const fetchData = async () => {
      try {
        const res = await service.getBook(String(params.slug));
        setBook(res);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from the server:", error);
        setLoading(false);
  
      }
    }
   
    useEffect(()=>{ fetchData() },[])

  return (
    <Container className=' max-w-screen-xl mt-8  h-screen'>

        {
          loading ? <Loader/> :
          <>
                <div className=" w-44 h-auto">
                    <Image alt='bookimg' src={book?.bookImg} width={1000} height={1000}/>
                  </div> 
                <h1 className="text-lg font-bold">{book?.bookName}</h1>
                <h3 className="text-md font-medium">{book?.author}</h3>
                <p>{book?.description}</p>
                <p>{book?.rentPrice}</p>
                <p>{book?.availability ? "In Stock":"Out Of Stock"}</p>
                {
                  book?.genre.map((g,i) => (
                    <p key={i}>{g}</p>
                  ))
                }

          </>
        }


</Container>
    
  )
}

export default page
