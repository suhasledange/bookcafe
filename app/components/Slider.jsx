'use client'
import React from 'react'
import Book from './Book'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Container from './Container';
const Slider = ({title}) => {

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 700, min: 0 },
            items: 2
        }
    };
  return (
    <Container className="max-w-screen-xl overflow-x-hidden md:px-0 px-3 ">

    <div className="mt-16">
            <div className="relative w-full border-b pb-3 text-2xl font-bold mb-6">
                {title}
                <div className='absolute bg-black w-[8%] h-[0.2rem] bottom-0 left-0'></div>
                </div>

            <Carousel
                responsive={responsive}
                itemClass="px-[2rem]"
                className='z-10 flex items-center justify-start'
            >
           <Book Img="/temp.webp"/>
           <Book Img="/temp.webp"/>
           <Book Img="/temp2.webp"/>
           <Book Img=""/>
           <Book Img="/temp2.webp"/>
           <Book Img=""/>
           <Book Img=""/>
           <Book Img=""/>
            </Carousel>
        </div>
    </Container>

  )
}

export default Slider
