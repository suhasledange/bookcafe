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
            items: 6
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 3
        }
    };
  return (
    <Container className="overflow-x-hidden z-10">

    <div className="mt-16">
            <div className="relative w-full border-b pb-3 text-2xl font-bold mb-6">
                {title}
                <div className='absolute bg-black w-[8%] h-[0.2rem] bottom-0 left-0'></div>
                </div>

            <Carousel
                responsive={responsive}
                itemClass="px-[2rem]"
            >
           <Book Img="/temp.webp"/>
           <Book Img="/temp.webp"/>
           <Book Img="/temp2.webp"/>
           <Book/>
           <Book Img="/temp2.webp"/>
           <Book/>
           <Book/>
           <Book/>
            </Carousel>
        </div>
    </Container>

  )
}

export default Slider
