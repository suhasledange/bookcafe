'use client';
import service from "@/app/appwrite/service";
import { useMemo, useEffect, useState, useCallback } from "react";
import Container from "@/app/components/Container";
import Loader from "@/app/components/Loader";
import Image from "next/image";
import Slider from "@/app/components/Slider";
import { IoMdHeartEmpty } from "react-icons/io";
import Button from "@/app/components/Button";

const BookCard = ({ params }) => {
  const [book, setBook] = useState(null);

  const [similarbooks, setSimilarBooks] = useState();
  const [loading, setLoading] = useState(true);

const getBookbygenre = useCallback(async () => {
  
  try {
       const res = await service.getBooksByGenre(String(book?.genre[0]));

    setSimilarBooks(res);
    setLoading(false);

  } catch (error) {
    console.error("Error fetching data from the server:", error);
    toast.error("Error fetching data from the server. Please try again later.");
    setLoading(false);
  }
}, [book?.genre, service]);


useEffect(() => {
  getBookbygenre();
}, [getBookbygenre]);

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





  return (
    <>
      {loading ? (
        <Container className="h-[35rem] flex items-center justify-center max-w-screen-xl">
            <Loader/>
        </Container>
        
      ) : (
        <Container className=" max-w-screen-xl mt-12">


          <Container className=' max-w-screen-lg'>

            <div className="flex flex-col lg:flex-row md:px-10 gap-10 lg:gap-32 w-full mx-auto ">

              {/* left */}
              <div className="flex-[1] w-full  md:max-w-[300px] mx-auto lg:mx-0 ">

                <div className="space-y-8 w-full">

                  <Image alt='bookimg' style={{ width: "100%", height: "100%", objectFit: "contain" }} src={book?.bookImg} width={1000} height={1000} />

                  <div className="flex item-center justify-center gap-5">
                    
                    <div className="flex-[0.5]">
                       <button
                      //  onClick={() => {
                      //    dispatch(addToCart({
                      //      Id,
                      //      Img,
                      //      bookName,
                      //      author,
                      //      price: rentPrice,
                      //      oneQuantityPrice: rentPrice
                      //    }))
                      //    notify()
                      //  }}
                       disabled={!book?.availability} className={`${book?.availability ? "transition-transform active:scale-95" : " cursor-not-allowed"} hover:bg-black/[0.8] duration-150 bg-black text-white py-2 w-full px-3 tracking-wider`}>{book?.availability ? "Add To Cart" : "Out of Stock"}</button>
                    
                    </div>
                    <div className="flex-[0.5]">


                    <button
                      //  onClick={() => {
                      //    dispatch(addToCart({
                      //      Id,
                      //      Img,
                      //      bookName,
                      //      author,
                      //      price: rentPrice,
                      //      oneQuantityPrice: rentPrice
                      //    }))
                      //    notify()
                      //  }}
                       className={`flex items-center justify-center gap-2 transition-transform active:scale-95 hover:bg-black/[0.8] duration-150 bg-black text-white py-2 w-full px-3 tracking-wider`}><IoMdHeartEmpty className="text-xl"/> Whislist</button>
                    
                    
                    </div>

                  </div>

                </div>

              </div>

              {/* right */}
              <div className="flex-[1]">
                <div className="text-[34px] font-semibold mb-2 leading-tight">
                  {book?.bookName}
                </div>

                {/* PRODUCT SUBTITLE */}
                <div className="text-lg font-semibold mb-8">
                  {book?.author}
                </div>


                {/* PRODUCT PRICE */}
                {
                  book?.availability ? (
                    <div>
                      <div className="flex items-center">
                        <p className="mr-2 text-lg font-semibold">
                          Rent Price : &#8377;{book?.rentPrice}
                        </p>
                      </div>
                      <div className="text-md font-medium text-black/[0.5]">
                        incl. of taxes
                      </div>
                      <div className="text-md font-medium text-black/[0.5] mb-8">
                        {`(Also includes all applicable duties)`}
                      </div>
                    </div>
                  ) : (
                    <div className="text-lg font-semibold mb-8 text-red-700">Out Of Stock</div>
                  )
                }

                <div className="mb-5">
                  {/* HEADING START */}
                  <div className="flex justify-between">
                    <div className="text-md font-semibold">
                      Genres
                    </div>
                  </div>
                </div>

                <div
                  className="grid grid-cols-5 gap-2 mb-8"
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
            <Slider books={similarbooks} title="Similar Books" loading={loading}/>
        </Container>

      )}
    </>

  );
};

export default BookCard;
