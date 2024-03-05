'use client'
import Link from "next/link";
import Container from "../components/Container";
import Image from "next/image";
import Button from "../components/Button";
import CartItem from "../components/CartItem";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import { useMemo } from "react";

const Cart = () => {
  const {cartItems} = useSelector((state => state.cart))
  const subTotal = useMemo(()=>{
    return cartItems.reduce((total,val)=>total+val.price,0)
},[cartItems])

  return (
    <Container className="max-w-screen-xl mt-8">
      
      {
        cartItems.length > 0 && (
          <>
        <div className="text-center max-w-3xl mx-auto mt-8 md:mt-0">
          <div className="text-2xl md:text-3xl mb-3 font-semibold leading-tight">
            Shopping Cart
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 py-10">
                            {/* CART ITEMS START */}
                            <div className="flex-[2]">
                                <div className="text-lg font-bold">
                                    Cart Items
                                </div>
                      {
                        cartItems?.map(item=>(
                          <CartItem key={item.Id} Id={item.Id} Img={item.Img} bookName={item.bookName} author={item.author} price={item.price} quantity={item.quantity} />   
                        ))
                      }

                            </div>
                            {/* CART ITEMS END */}
                            {/* SUMMARY START */}
                            <div className="flex-[1]">
                                <div className="text-lg font-bold">Summary</div>

                                <div className="p-5 my-5 bg-black/[0.05]">
                                    <div className="flex justify-between">
                                        <div className="uppercase text-md md:text-lg font-medium text-black">
                                            Subtotal
                                        </div>
                                        <div className="text-md md:text-lg font-medium text-black">
                                            &#8377;{subTotal}
                                        </div>
                                    </div>
                                    <div className="text-sm md:text-md py-5 border-t mt-5">
                                        The subtotal reflects the total price of
                                        your order, including duties and taxes,
                                        before any applicable discounts. It does
                                        not include delivery costs and
                                        international transaction fees.
                                    </div>
                                </div>

                                {/* BUTTON START */}
                                <Button className='flex items-center w-full justify-center py-3 text-md' text='Checkout'
                                    // onClick={handlePayment}
                                >
                                    Checkout
                                     {/* <Loader /> */}
                                </Button>
                                {/* BUTTON END */}
                            </div>
                            {/* SUMMARY END */}
                        </div>
          </>

)}

    { cartItems.length < 1 && (

      <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
        <Image
          alt="empty"
          src="/empty-cart.jpg"
          width={300}
          height={300}
          className="w-[300px] md:w-[400px]"
        />
        <span className="text-xl font-bold">
          Your cart is empty
        </span>
        <span className="text-center mt-4">
          Looks like you have not added anything in your cart.
          <br />
          Go ahead and explore some books.
        </span>
        <Link
          href="/book"
        >
          <Button className='mt-5 px-4 py-3 text-md' text='Rent a Book' />
        </Link>
      </div>
    )}
    </Container>
  );
}

export default Cart;
