'use client';
import service from "@/app/appwrite/service";
import { useMemo, useEffect, useState, useCallback } from "react";
import Container from "@/app/components/Container";
import Loader from "@/app/components/Loader";
import Image from "next/image";
import Slider from "@/app/components/Slider";
import { IoMdHeartEmpty } from "react-icons/io";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { addToWish } from "@/store/wishSlice";
import { addToCart } from "@/store/cartSlice";
import { FiShare2 } from "react-icons/fi";
const BookCard = ({ params }) => {
  const [book, setBook] = useState(null);

  const [similarbooks, setSimilarBooks] = useState();
  const [loading, setLoading] = useState(true);
  const [Sliderloading, setSliderLoading] = useState(true);


  const fetchData = useMemo(
    () => async () => {
      try {
        const res = await service.getBook(String(params.slug));
        setBook(res);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from the server:", error);
        setLoading(false);
      }
    },
    [params.slug]
  );
  useEffect(() => {
    const fetchDataFunction = fetchData();
    fetchDataFunction.then();
  }, [fetchData]);


  const getBookbygenre = useCallback(async () => {
    try {
        const res = await service.getBooksByGenre(String(book?.genre[0]));
        setSimilarBooks(res);
        setSliderLoading(false)
    } catch (error) {
      console.error("Error fetching data from the server:", error);
      toast.error("Error fetching data from the server. Please try again later.");
    }
  }, [book?.genre]);
  
  
  useEffect(() => {

    getBookbygenre();
  }, [getBookbygenre]);
  
  const dispatch = useDispatch();

  const notify = () => {
    toast.success('Book Added To Cart', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  const notify1 = () => {
    toast.success('Book Added To Wishlist', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }


const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: book.bookName,
        text: book.description,
        url: window.location.href,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing:', error));
    } else {
      console.log("Web Share API not supported.");
    }
};

  return (
    <>
      {loading ? (
        <Container className="h-[35rem] flex items-center justify-center max-w-screen-xl">
            <Loader/>
        </Container>
        
      ) : (
        <Container className=" max-w-screen-xl mt-12">
          <ToastContainer/>
          <Container className=' max-w-screen-lg'>

            <div className="flex flex-col md:flex-row md:px-10 gap-10 md:gap-32 w-full mx-auto ">

              {/* left */}
              <div className="flex-[1] w-full  md:max-w-[300px] mx-auto lg:mx-0 ">

                <div className="space-y-8 w-[80%] mx-auto md:w-full drop-shadow-md">

                <div className="h-full w-full mx-auto">
                  <Image priority={true} alt='bookimg' style={{ width: "100%", height: "100%", objectFit: "contain" }} src={book?.bookImg} width={1000} height={1000} />
                </div>
                    
                  <div className="flex item-center justify-center gap-2">
                    
                    <div className="w-full">
                       <button
                       onClick={() => {
                         dispatch(addToCart({
                           Id:book.$id,
                           Img:book.bookImg,
                           bookName:book.bookName,
                           author:book.author,
                           price: book.rentPrice,
                           oneQuantityPrice: book.rentPrice
                         }))
                         notify()
                       }}
                       disabled={!book?.availability} className={`${book?.availability ? "transition-transform active:scale-95" : " cursor-not-allowed"} hover:bg-black/[0.8] duration-150 bg-black text-white py-2 w-full px-3 tracking-wider`}>{book?.availability ? "Add To Cart" : "Out of Stock"}</button>
                    
                    </div>
                    <div className="w-full ">
                    <button
                       onClick={() => {
                         dispatch(addToWish({
                          Id:book.$id,
                          Img:book.bookImg,
                          bookName:book.bookName,
                          author:book.author,
                          availability:book.availability,
                          price: book.rentPrice,
                         }))
                         notify1()
                       }}
                       className={`flex items-center justify-center gap-2 transition-transform active:scale-95 hover:bg-black/[0.8] duration-150 bg-black text-white py-2 w-full px-3 tracking-wider`}><IoMdHeartEmpty className="text-xl"/> Whislist</button>
                    
                    </div>
                  </div>

                </div>

              </div>

              {/* right */}
              <div className="flex-[1] justify-between items-center">
                
                <div className=" flex items-start justify-between">
                <div className="text-[34px] font-semibold mb-2 leading-tight">
                  {book?.bookName}
                </div>
                
                <div className="cursor-pointer hover:bg-black/[0.05] p-[0.68rem] rounded-full duration-150" onClick={handleShare}>
                    <FiShare2 className="text-2xl "/>
                </div>

                </div>

                <div className="text-lg font-semibold mb-8">
                  {book?.author}
                </div>


                {
                  book?.availability ? (
                    <div>
                      <div className="flex items-center">
                        <p className="mr-2 text-lg font-semibold">
                          Rent Price : &#8377;{book?.rentPrice}
                        </p>
                      </div>
                      {/* <div className="text-md font-medium text-black/[0.5]">
                        incl. of taxes
                      </div> */}
                      <div className="text-md font-medium text-red-700/[0.8] mb-8">
                        {`(14 days of return period)`}
                      </div>
                    </div>
                  ) : (
                    <div className="text-lg font-semibold mb-8 text-red-700">Out Of Stock</div>
                  )
                }

                <div className="mb-5">
                  <div className="flex justify-between">
                    <div className="text-md font-semibold">
                      Genres
                    </div>
                  </div>
                </div>

                <div
                  className="grid md:grid-cols-5 grid-cols-3 gap-2 mb-8"
                >

                  {book?.genre.map((genre, i) => (
                    <div
                      key={i}
                      className={`border  rounded-md text-gray-700 bg-gray-50 text-sm text-center py-2 cursor-pointer font-medium`}
                    >
                      {genre}
                    </div>
                  ))}

                </div>

                <div>
                  <div className="text-lg font-bold mb-5">Description</div>
                  <div className="text-sm text-gray-800 mb-5 h-[15rem] overflow-y-scroll pl-1 pr-3 py-1 text-justify">
                    {book?.description}
                  </div>

                </div>
              </div>



            </div>

          </Container>
              <Slider books={similarbooks} title="Similar Books" loading={Sliderloading}/>
        </Container>

      )}
    </>

  );
};

export default BookCard;
