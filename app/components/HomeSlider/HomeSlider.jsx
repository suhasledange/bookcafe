'use client'
import Container from "../Container"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import "./style.css"
import Image from "next/image";
import Button from "../Button";

const HomeSlider = () => {
  return (
    <Container className='h-[20rem] max-w-full'>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="flex items-center justify-evenly md:w-full mx-auto w-[90%] ">
            <div className=" text-left">
              <h1 className="font-bold md:text-5xl text-3xl w-80 ">India's Online</h1>
              <h1 className="font-bold md:text-5xl text-3xl mb-3">Book Rental Service</h1>
              <p className="text-gray-700 md:text-md text-md">Start Readig with BookCafe</p>
              <Button className="mt-3" text="Sign Up Now" />
            </div>
              <div className="md:block hidden w-72 h-72 ">
                <Image style={{
                  width: '100%',
                  objectFit:'contain',
                  height: '100%',
                }} src='/HomeSlide1.svg' alt='X' width={1000} height={1000} />
              </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </Container>
  )
}

export default HomeSlider
