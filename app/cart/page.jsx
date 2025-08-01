"use client";

import Link from "next/link";
import Container from "../components/Container";
import Image from "next/image";
import Button from "../components/Button";
import CartItem from "../components/CartItem";
import { useSelector } from "react-redux";
import { useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContext } from "@/context/ToastContext";
import service from "../appwrite/service";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const userData = useSelector((state) => state.auth.userData);
  const [bookDetails, setBookDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { notifyToast } = useContext(ToastContext);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const ids = cartItems.map((item) => item.Id);
        const { documents } = await service.getBooksByIds(ids);

        const merged = documents.map((book) => {
          const cartItem = cartItems.find((item) => item.Id === book.$id);

          return {
            ...book,
            Id: cartItem?.Id,
            quantity: cartItem?.quantity,
          };
        });

        setBookDetails(merged);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    if (cartItems.length > 0) {
      fetchBooks();
    } else {
      setBookDetails([]);
    }
  }, [cartItems]);


  const subTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const book = bookDetails.find((b) => b.$id === item.Id);
      if (book) {
        return total + book.rentPrice * item.quantity;
      }
      return total;
    }, 0);
  }, [cartItems, bookDetails]);

  const handleNavigate = async () => {
    setLoading(true);
    try {
      if (!userData) {
        await notifyToast("Please login to proceed", 2000);
        router.push("/login");
        return;
      }

      const hasPhone = userData.phone?.trim() !== "";
      const hasAddress =
        Array.isArray(userData.address) && userData.address.length > 0;

      if (!hasPhone || !hasAddress) {
        await notifyToast("Please update address and phone", 2000);
        router.push("/profile");
        return;
      }

      const { documents } = await service.getDueOrders(userData.UserId);
      if (documents.length > 0) {
        await notifyToast("Please return overdue book", 2000);
        return;
      }

      router.push("/checkout");
    } catch (error) {
      console.log("Error during checkout navigation:", error);
      await notifyToast("Something went wrong", 2000);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Container className="max-w-screen-xl mt-8">
      {bookDetails.length > 0 ? (
        <>
          <div className="text-center max-w-3xl mx-auto mt-8 md:mt-0">
            <div className="text-2xl md:text-3xl mb-3 font-semibold leading-tight">
              Cart
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 py-10">
            <div className="flex-[2]">
              <div className="text-lg font-bold">Cart Items</div>
              {bookDetails?.map((book) => (
                <CartItem
                  key={book.Id}
                  Id={book.Id}
                  Img={book.bookImg}
                  bookName={book.bookName}
                  author={book.author}
                  price={book.rentPrice}
                  bookQuantity={book.bookQuantity}
                  quantity={book.quantity}
                />
              ))}
            </div>

            <div className="flex-[1]">
              <div className="text-lg font-bold">Summary</div>
              <div className="p-5 my-5 bg-black/[0.05]">
                <div className="flex justify-between">
                  <div className="uppercase text-md md:text-lg font-medium text-black">
                    Subtotal
                  </div>
                  <div className="text-md md:text-lg font-medium text-black">
                    ₹{subTotal}
                  </div>
                </div>
                <div className="text-sm md:text-md py-5 border-t mt-5">
                  The subtotal reflects the total price of your order, including
                  duties and taxes, before any applicable discounts. It does not
                  include delivery costs and international transaction fees.
                </div>
              </div>

              <div onClick={handleNavigate}>
                <Button
                  className="flex items-center w-full justify-center py-3 gap-3 text-md"
                  text="Checkout"
                  loading={loading}
                  className1="w-4 h-4"
                />
              </div>
            </div>
          </div>
        </>
      ) : (
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
          <span className="text-xl font-bold">Your cart is empty</span>
          <span className="text-center mt-4">
            Looks like you have not added anything in your cart.
            <br />
            Go ahead and explore some books.
          </span>
          <Link href="/book">
            <Button className="mt-5 px-4 py-3 text-md" text="Rent a Book" />
          </Link>
        </div>
      )}
    </Container>
  );
};

export default Cart;
