'use client'
import Container from "../Container"
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import "./style.css"
import Image from "next/image";
import Button from "../Button";
import Link from "next/link";
import { useCallback, useContext, useEffect, useState } from "react";
import service from "@/app/appwrite/service";
import { ToastContext } from "@/context/ToastContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import HomeSkeleton from "./HomeSkeleton";

const HomeSlider = () => {
  
  const [book,setBook] = useState()
  const dispatch = useDispatch();
  const {notifyToast} = useContext(ToastContext)
  const {cartItems} = useSelector((state => state.cart))
  const status = useSelector(state => state.auth.status)
  const canAddToCart = () => {
    
    const totalQuantityInCart = cartItems.reduce((total, item) => {
      if (item.Id === book?.$id) {
        return total + item.quantity;
      }
      return total;
    }, 0);

    return totalQuantityInCart < book?.bookQuantity;
  };

  let isAvaiable = canAddToCart()
  const fetchdata = useCallback( async ()=>{

    try { 

      const {documents} = await service.getLatestBook();
      setBook(documents[0])
      
    } catch (error) {
      console.log("error getting data")
    }

  },[])

  useEffect(() => {
      fetchdata();  
  }, [fetchdata]);
  
  return (
    <Container className='max-w-full h-[25rem] md:h-[20rem]'>
      <Swiper

        style={{
          "--swiper-pagination-color": "#000000",
          "--swiper-pagination-bullet-inactive-color": "#999999",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet-size": "10px",
          "--swiper-pagination-bullet-horizontal-gap": "5px",
        }}
        autoplay={{
          delay: 2500,
      disableOnInteraction: false,
        }}
      loop={true}
      pagination={{
        dynamicBullets: true,
        clickable:true,
      }}
        // navigation={true}
      modules={[ Autoplay,Navigation, Pagination]}
      className="mySwiper"
      >
     
     <SwiperSlide>
        <div className="flex items-center ml-5 md:ml-0 md:justify-evenly w-full mx-auto ">
        <div className=" text-left">
            <h1 className="font-bold md:text-5xl text-3xl">Feed Your Mind</h1>
            <h1 className="font-bold md:text-5xl text-3xl mb-3">Rent Read Repeat!</h1>
            <p className="text-gray-700 md:text-md text-md">Start Readig with BookCafe</p>
            <Link  href={` ${status ? '/book' : '/signup'}  `}>
            <Button className="mt-3" text={` ${status ? 'Go To Store' : 'Sign Up Now'}  `} />
            </Link> 
          </div>
          <div className=" space-y-4 text-md text-left">
             
          <div className="md:block hidden w-72 h-72 ">
            <Image blurDataURL='/HomeSlide1.svg' placeholder = "blur" style={{
              width: '100%',
              objectFit: 'contain',
              height: '100%',
            }} src='/HomeSlide1.svg' alt='X' width={500} height={500} />
          </div>
          </div>
        </div>
      </SwiperSlide> 


      {
        book ? 

        <SwiperSlide>

        <div className="flex items-center md:justify-center gap-4 w-full mx-auto shrink ">
        
             
          <Link href={`/book/${book.$id}`} className=" hover:scale-105 duration-200 drop-shadow-xl md:w-72 md:h-72 w-56 h-56 md:py-5 py-3 ">
            <Image 
            
            style={{
              width: '100%',
              objectFit: 'contain',
              height: '100%',
            }} src={book.bookImg} alt='X' width={500} height={500} />

          </Link>


          <div className="text-left">
            <h1 className="font-bold mb-4 text-black text-lg custom-pulse">New Arrival</h1>
            <h1 className="font-bold md:text-3xl text-2xl">{book.bookName}</h1>
            <h1 className="font-medium text-md mb-3">{book.author}</h1>
            <p className="font-semibold text-gray-700">  &#8377;{book.rentPrice}</p>           
            <div className="flex gap-5 mt-5 items-start md:items-center md:flex-row flex-col">
            <button
          onClick={() => {
            if (canAddToCart()) {
              dispatch(
                addToCart({
                  Id:book.$id,
                  Img:book.bookImg,
                  bookName:book.bookName,
                  author:book.author,
                  price: book.rentPrice,
                  availability:book.availability,
                  oneQuantityPrice: book.rentPrice,
                  bookQuantity: book.bookQuantity,
                })
              );
              notifyToast("Book added to cart",1500);
            }
          }}
          disabled={!book?.availability || !canAddToCart()}

          className={`${isAvaiable ? "transition-transform active:scale-95" : "cursor-not-allowed"} hover:bg-black/[0.8] duration-150 bg-black md:text-md text-sm text-white p-[0.3rem] px-3 tracking-wider`}
        >
          {book?.availability ? "Add To Cart" : "Out of Stock"}
        </button>

        <Link className="" href={`/book/${book.$id}`}>
            <button className="border-2 border-black md:text-md text-sm p-[0.3rem] px-3 bg-transparent text-black active:scale-95 transform hover:text-white hover:bg-black duration-200">Read More</button>
          </Link>

              </div> 
        
        </div>
        </div>
      </SwiperSlide>

      :
          <SwiperSlide>
              <HomeSkeleton/>
          </SwiperSlide>

    }




      <SwiperSlide>
        <div className="flex items-center ml-5 md:ml-0 md:justify-evenly w-full mx-auto ">
        <div className=" text-left">
            <h1 className="font-bold md:text-5xl text-3xl">Your Campus Library</h1>
            <h1 className="font-bold md:text-5xl text-3xl mb-3">on Demand</h1>
            <p className="text-gray-700 md:text-md text-md w-[90%]">Rent Books at BookCafe</p>
            <Link href="/book">
            <Button className="mt-3" text="Go to Store" />
            </Link>
          </div>
          <div className=" space-y-4 text-md text-left">
             
          <div className="md:block hidden w-72 h-72 ">
            <Image blurDataURL='/HomeSlide2.svg'  placeholder = "blur" style={{
              width: '100%',
              objectFit: 'contain',
              height: '100%',
            }} src='/HomeSlide2.svg' alt='X' width={500} height={500} />
          </div>

          </div>
        </div>
      </SwiperSlide>

   
    </Swiper>
    </Container >
  )
}

export default HomeSlider
