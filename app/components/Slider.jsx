import Book from './Book'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Container from './Container';
import BookSkeleton from './BookSkeleton';

const Slider = ({books,title="",loading}) => {
  books = books?.documents;
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 7
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 5
        },
        mobile: {
            breakpoint: { max: 700, min: 0 },
            items: 2
        }
    };
  return (
    <Container className="max-w-screen-xl overflow-hidden">

    <div className="mt-16">
            <div className="relative w-full border-b pb-3 text-2xl font-bold mb-10">
                {title}
                <div className='absolute bg-black w-[25%] md:w-[10%] h-[0.2rem] bottom-0 left-0'></div>
                </div>
           {
            loading ? 
            <Carousel
            responsive={responsive}
            className="z-10 flex py-2 items-center justify-start"
          >
            {Array.from({ length: 7 }).map((_, index) => (
              <BookSkeleton key={index} />
            ))}
          </Carousel>
            :
            <Carousel
                responsive={responsive}
                className='z-10 flex py-2 items-center justify-start'
            >
          {books?.map(b=>(
            
            <Book key={b.$id}
            Id={b.$id} 
            author={b.author} 
            Img={b.bookImg} 
            availability={b.availability}
            bookName={b.bookName}
            rentPrice={b.rentPrice}
            bookQuantity={b.bookQuantity}
            />
            
            ))}
            </Carousel>
           }


        </div>
    </Container>

  )
}

export default Slider
