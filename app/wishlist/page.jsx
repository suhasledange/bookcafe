'use client'
import Link from "next/link";
import Container from "../components/Container";
import Image from "next/image";
import Button from "../components/Button";
import { useSelector } from "react-redux";
import WishlistItem from "../components/WishlistItem";

const Wishlist = () => {

  const {wishItems} = useSelector((state => state.wish))
  
  return (
    <Container className="max-w-screen-lg mt-8">
      
      {
        wishItems.length > 0 && (
          <>
        <div className="text-center max-w-3xl mx-auto mt-8 md:mt-0">
          <div className="text-2xl md:text-3xl mb-3 font-semibold leading-tight">
            Your Wishlist
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 py-10">
                            <div className="flex-[2]">
                                
                      {
                        wishItems?.map(item=>(
                          <WishlistItem key={item.Id} Id={item.Id} Img={item.Img} bookName={item.bookName} author={item.author} price={item.price} quantity={item.quantity} availability={item.availability} bookQuantity ={item.bookQuantity}/>   
                        ))
                      }

                            </div>
                        </div>
          </>

)}

    { wishItems.length < 1 && (

      <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
        <Image
        placeholder="blur"
        blurDataURL="/empty-cart.jpg"
          alt="empty"
          src="/empty-cart.jpg"
          width={300}
          height={300}
          className="w-[300px] md:w-[400px]"
        />
        <span className="text-xl font-bold">
          Your Wishlist is empty
        </span>
        <span className="text-center mt-4">
          Looks like you have not added anything in your wishlist.
          <br />
          Go ahead and explore some books.
        </span>
        <Link
          href="/book"
        >
          <Button className='mt-5 px-4 py-3 text-md' text='Go to Store' />
        </Link>
      </div>
    )}
    </Container>
  );
}

export default Wishlist;
