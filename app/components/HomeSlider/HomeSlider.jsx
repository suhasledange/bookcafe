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

const HomeSlider = () => {
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
            <h1 className="font-bold md:text-5xl text-3xl">India's Online</h1>
            <h1 className="font-bold md:text-5xl text-3xl mb-3">Book Rental Service</h1>
            <p className="text-gray-700 md:text-md text-md">Start Readig with BookCafe</p>
            <Link href="/signup">
            <Button className="mt-3" text="Sign Up Now" />
            </Link> 
          </div>
          <div className=" space-y-4 text-md text-left">
             
          <div className="md:block hidden w-72 h-72 ">
            <Image style={{
              width: '100%',
              objectFit: 'contain',
              height: '100%',
            }} src='/HomeSlide1.svg' alt='X' width={1000} height={1000} />
          </div>

          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="flex items-center ml-5 md:ml-0 md:justify-evenly w-full mx-auto ">
        <div className=" text-left">
            <h1 className="font-bold md:text-5xl text-3xl">The More you Read</h1>
            <h1 className="font-bold md:text-5xl text-3xl mb-3">The Less You Pay</h1>
            <p className="text-gray-700 md:text-md text-md w-[90%]">Explore our flexible reading plans and see what suits you</p>
            <Link href="/about">
            <Button className="mt-3" text="Read More" />
            </Link>
          </div>
          <div className=" space-y-4 text-md text-left">
             
          <div className="md:block hidden w-72 h-72 ">
            <Image style={{
              width: '100%',
              objectFit: 'contain',
              height: '100%',
            }} src='/HomeSlide2.svg' alt='X' width={1000} height={1000} />
          </div>

          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="md:flex items-center ml-5 md:ml-0 space-y-6 md:space-y-0 md:justify-evenly w-full mx-auto ">
          <div className=" text-left">
            <h1 className="font-bold md:text-5xl text-3xl w-80 ">Its's as Easy </h1>
            <h1 className="font-bold md:text-5xl text-3xl mb-3">as 1,2,3..</h1>
            <p className="text-gray-700 md:text-md text-md w-[90%]">3 steps to embark to your reading journey</p>
            <Link href="/signup">
                <Button className="mt-3" text="Sign Up Now" />
            </Link>
          </div>
          <div className=" space-y-4 text-md text-left">
                <p className="text-sm md:text-lg"> <span className="text-black font-bold text-xl md:text-2xl mr-1 ">1</span> Find a book you want to read. </p>
                <p className="text-sm md:text-lg"> <span className="text-black font-bold text-xl md:text-2xl mr-1">2</span> Get it delivered to your doorstep. </p>
                <p className="text-sm md:text-lg"> <span className="text-black font-bold text-xl md:text-2xl mr-1">3</span> Exchange it for your next read, from the confort at your home. </p>
          </div>
        </div>
      </SwiperSlide>


    </Swiper>
    </Container >
  )
}

export default HomeSlider
