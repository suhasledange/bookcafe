'use client'
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Book from '../components/Book';
import Container from '../components/Container';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import service from '../appwrite/service';
import Loader from '../components/Loader';
const genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Science Fiction', 'Fantasy','Arts And Crafts','Classics','Cookery','Comics','General','Geo-Politcs','Hindi','History','Health And Fitness','Kids','Marathi','Music & Movies','Science','Sports','Technical','Travel'];

export default function Home() {



  const [books,setBooks] = useState();

  const [loading,setLoading] = useState(true);


  useEffect(()=>{
       
      service.getBooks().then(res =>{
          const {documents} = res
          setBooks(documents);
          setLoading(false);
       })
    },[])

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genreMenu,setGenreMenu] = useState(false)
  const handleGenreChange = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  return (
    <Container className="max-w-screen-xl mt-5 md:mt-10 mb-10 overflow-x-hidden">

    <div className='flex gap-5'>
       

        <div className='hidden md:flex flex-[0.2] py-3 h-screen overflow-y-scroll'>
          
          <div className='space-y-4 '>
            {genres.map((genre) => (
              <div key={genre} className='space-x-3 text-md text-gray-700'>
                <input
                  type="checkbox"
                  id={genre}
                  className=' w-[0.9rem] h-[0.9rem] '
                  checked={selectedGenres.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                />
                <label htmlFor={genre}>{genre}</label>
              </div>
            ))}
          </div>
        </div>


  {/* Mobile */}
      <div className=' md:flex-[0.8] flex-1 md:ml-5 ml-0 relative'>
            
        <div className='md:hidden'>

        <div className='px-3'>
        
          <button onClick={()=> setGenreMenu(!genreMenu)} className='p-2 hover:bg-black/[0.85] bg-black text-gray-200 mb-8 text-lg font-normal flex items-center gap-1 cursor-pointer'>Filter by Genre { genreMenu ? <IoIosArrowDown className='text-2xl'/> : <IoIosArrowUp className='text-2xl'/>} </button>
        
        </div>    

        <div className={`${!genreMenu ? "hidden" :""} z-30 absolute top-10 left-0 w-full mt-1 `}>
        <div onClick={()=>setGenreMenu(false)} className='absolute top-0 left-0  w-full -z-10 h-screen'>
        </div>
        <div className={`bg-white  w-[58%] z-20` }>
        <div className='py-3 px-2 h-screen overflow-y-scroll'>
          
          <div className='space-y-4 '>
            {genres.map((genre) => (
              <div key={genre} className='space-x-3 text-md text-gray-700'>
                <input
                  type="checkbox"
                  id={genre}
                  className=' w-[0.9rem] h-[0.9rem] '
                  checked={selectedGenres.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                />
                <label htmlFor={genre}>{genre}</label>
              </div>
            ))}
          </div>
        </div>
        </div>     
        </div>
        </div>
      {
        loading ? <Loader/> :
        <div className='grid gap-3 space-y-6' style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))'}} >
          
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
        </div>
    }
      </div>
    </div>
    </Container>

  );
}
