'use client'
import Link from "next/link";
import Container from "../components/Container";
import Image from "next/image";
import Button from "../components/Button";

const Cart = () => {
  

  return (
    <Container>

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
      <Button className='mt-5 px-4 py-3 text-md' text='Rent a Book'/>
    </Link>
</div>
</Container>

);
}

export default Cart;
