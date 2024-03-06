import Book from './Book'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Container from './Container';
import Loader from './Loader';
const Slider = ({books,title}) => {

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
            breakpoint: { max: 700, min: 0 },
            items: 2
        }
    };
  return (
    <Container className="max-w-screen-xl md:px-0 px-3 overflow-hidden">

    <div className="mt-16">
            <div className="relative w-full border-b pb-3 text-2xl font-bold mb-10">
                {title}
                <div className='absolute bg-black w-[25%] md:w-[10%] h-[0.2rem] bottom-0 left-0'></div>
                </div>
           {
            !books ? <Loader/> :
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
            description={b.description}
            genre={b.genre}
            rentPrice={b.rentPrice}
            
            />
            
            ))}
            </Carousel>
           }


        </div>
    </Container>

  )
}

export default Slider
