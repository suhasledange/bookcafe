"use client";
import { useSelector } from "react-redux";
import Container from "../components/Container";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Button from "../components/Button";
import { BsCart } from "react-icons/bs";
import "./checkout.css";
import service from "../appwrite/service";
import formatDate from "../util/formatDate";
import { conf } from "../util/conf";
import Loader from "../components/Loader";
import { ToastContext } from "@/context/ToastContext";
const Checkout = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const userData = useSelector((state) => state.auth.userData);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [onlineLoading, setOnlineLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("payOnline");

  const { notifyToast } = useContext(ToastContext);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const subTotal = useMemo(() => {
    return cartItems.reduce((total, val) => total + val.price, 0);
  }, [cartItems]);

  useEffect(() => {
    if (cartItems.length === 0 || userData === null) router.replace("/");
  }, [cartItems]);

  const [selectedAddress, setSelectedAddress] = useState(
    userData?.address ? userData.address[0] : null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      userId: userData?.UserId,
      collectionId: userData?.$id,
      name: userData?.name || "",
      phone: userData?.phone || "",
      email: userData?.email || "",
      address: userData?.address,
      paymentMethod: "",
      price: "",
      bookId: "",
      payment: "pending",
      status: "IN_TRANSIT",
      totalPrice: subTotal,
    },
  });


  const [pincode, setPincode] = useState(""); 
  const [pincodeError, setPincodeError] = useState(""); 

  const handlePincodeChange = (event) => {
      setPincode(event.target.value);
  };


  const checkPinCode = ()=>{
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    
    if (!pincodeRegex.test(pincode)) {
        notifyToast("Invalid Pincode",1500)
        setPincodeError("Please enter a valid pincode.");
        return false;
    }
    return true
  }

  const validatePincode = () => {

    if(checkPinCode()){
       
        const validPincodes = ["422608", "422605"]; 
        if (!validPincodes.includes(pincode)) {
            notifyToast("Not avaliable at your location",1500)
            setPincodeError("Not available at you location.");
            return false;
        }
        else{
            setPincodeError(""); 
            return true;
        }
    }
    else{
        return false
    }
    
};

  const handleAddressChange = (address) => {
    setSelectedAddress(address);
  };

  const sendMail = async (res, payment) => {
    const subject = "Order Placed Successfuly!!!";
    const orderId = res.$id;
    const orderDate = formatDate(res.DateOfOrder);
    const bookName = res.bookName;
    const author = res.author;
    const address = res.address;
    const email = res.email;
    const name = res.name;
    const Payment = payment === "complete" ? "Online" : "CashOnDelivery";

    const response = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        subject,
        email,
        orderId,
        bookName,
        author,
        address,
        name,
        orderDate,
        Payment,
      }),
    });
  };

  const onSubmit = async (data) => {


    if(!validatePincode()){
        return
    }

    data.address = selectedAddress;
    data.paymentMethod = paymentMethod;

    try {
      setLoading(true);
      if (paymentMethod === "payOnline") {
        const amount = data.totalPrice * 100;
        const userId = data.userId;
        const pId = data.collectionId;
        const name = data.name;
        const email = data.email;
        const contact = data.phone;
        const address = data.address;
        const paymentFor = "BookRenting";
        const response = await fetch("/api/razorpay", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            amount,
            userId,
            pId,
            name,
            email,
            contact,
            address,
            paymentFor,
          }),
        });

        const { order } = await response.json();

        const options = {
          key: conf.RAZORPAY_TEST_ID,
          name: "Book Cafe",
          currency: order.currency,
          amount: order.amount,
          order_id: order.id,
          description: "BookCafe Online Rentel Service",
          // image: logoBase64,
          handler: async function (response) {
            setOnlineLoading(true);
            const rpId = response.razorpay_payment_id;
            const payment = "complete";
            await sendToDB(payment, rpId, data);
            router.replace(`/successOrder/${response.razorpay_payment_id}`);
            setOnlineLoading(false);

            console.log(response);
          },
          prefill: {
            name: order.notes.userName,
            email: order.notes.userEmail,
            contact: order.notes.phone,
            address: order.notes.address,
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

        paymentObject.on("payment.cancel", function () {
          notifyToast("Payment Cancelled!!!", 2000);
        });

        paymentObject.on("payment.failed", function (response) {
          notifyToast("Payment failed. Please try again", 2000);
        });
      } else if (paymentMethod === "cashOnDelivery") {
        const payment = "pending";
        const rpId = "COD";
        await sendToDB(payment, rpId, data);
        router.replace("/successOrder");
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }

  };

  const sendToDB = async (payment, rpId, data) => {
    for await (const book of cartItems) {
      const newData = { ...data };
      newData.price = book.price;
      newData.bookId = book.Id;
      newData.quantity = book.quantity;
      newData.bookQuantity = book.bookQuantity;
      newData.availability = book.availability;
      newData.bookName = book.bookName;
      newData.author = book.author;
      (newData.payment = payment), (newData.razorPayId = rpId);

      const res = await service.createOrder(newData);
      if (res) {
        await service.updateBookQuantity(newData);
        await sendMail(res, payment);
      }
    }
  };

  return (
    <>
      {onlineLoading && (
        <div className="fixed inset-0 z-50 bg-black/[0.7]">
          <div className="fixed inset-0 w-full h-full mx-auto">
            <div className="h-full flex items-center justify-center -translate-y-10 ">
              <div className="bg-white p-5 rounded-sm space-y-5">
                <h1>Please do not press back or refresh the page.</h1>
                <Loader />
              </div>
            </div>
          </div>
        </div>
      )}

      <Container className="max-w-screen-xl py-5 mb-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-screen-lg mt-5 py-2 mx-auto flex md:flex-row flex-col justify-between gap-5"
        >
          <div className="space-y-8 flex-[0.5] mx-auto md:w-full w-full">
            <div>
              <h1 className="text-2xl font-bold">Shipping</h1>
            </div>
            <div className="max-w-md">
              <div className="flex flex-col space-y-5 ">
                <div className=" space-y-2 text-sm">
                  <label
                    htmlFor="name"
                    className="block text-md font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name", { required: true })}
                    className="mt-1 p-2 outline-black border rounded-sm border-gray-300 w-full"
                  />
                  {errors.name?.type === "required" && (
                    <p role="alert" className="text-sm text-red-800 font-light">
                      Full Name is required
                    </p>
                  )}
                </div>

                <div className=" space-y-2 text-sm">
                  <label
                    htmlFor="phone"
                    className="block text-md font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register("phone", {
                      required: "Phone Number is required.",
                      pattern: {
                        value: /^\d{10}$/,
                        message: "Phone Number should be 10 digits",
                      },
                    })}
                    className="mt-1 p-2 outline-black border rounded-sm border-gray-300 w-full"
                  />
                  {errors.phone && (
                    <p role="alert" className="text-sm text-red-800 font-light">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  <label
                    htmlFor="email"
                    className="block text-md font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    defaultValue={userData?.email}
                    className="mt-1 p-2 text-gray-800 border outline-none rounded-sm border-gray-300 w-full"
                    disabled
                  />
                  <p className="text-xs text-gray-500">
                    You cannot change your email.
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  <label
                    htmlFor="pincode"
                    className="block text-md font-medium text-gray-700"
                  >
                    Pin Code
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    value={pincode}
                    onChange={handlePincodeChange}
                    className="mt-1 p-2 outline-black border rounded-sm border-gray-300 w-full"
                  />
                  {pincodeError && (
                    <p role="alert" className="text-sm text-red-800 font-light">
                      {pincodeError}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="address"
                    className="block text-md font-medium text-gray-700"
                  >
                    Select Address
                  </label>
                  {userData?.address &&
                    userData.address.map((address, index) => (
                      <div key={index} className="flex items-center py-1">
                        <input
                          type="radio"
                          id={`address_${index}`}
                          name="address"
                          value={address}
                          checked={selectedAddress === address}
                          onChange={() => handleAddressChange(address)}
                          className="mr-2"
                        />
                        <label htmlFor={`address_${index}`} className="text-sm">
                          {address}
                        </label>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 flex-[0.4] md:mt-0 mt-8  mx-auto w-full">
            <div>
              <h1 className="text-2xl font-bold">Summary</h1>
            </div>

            <div className=" space-y-2 p-5 border-2 bg-black/[0.01] rounded-md shadow-sm">
              <div className="p-1 flex items-center justify-between mb-3 border-b-2 border-black pb-3">
                <h1 className="text-sm font-medium flex items-center justify-start gap-2">
                  {" "}
                  <BsCart className="text-lg" /> {cartItems.length} item(s) in
                  Cart
                </h1>
                <Link
                  href="/cart"
                  className="text-sm font-semibold underline underline-offset-2"
                >
                  Edit Cart
                </Link>
              </div>
              {cartItems?.map((book) => (
                <div
                  key={book?.Id}
                  className="border-b-2 p-1 pb-2 space-y-1 mb-4"
                >
                  <div className="flex items-center gap-3 justify-between">
                    <h1 className="text-md text-gray-800 font-semibold">
                      {book?.bookName}
                      <span className="font-medium text-sm">
                        {" "}
                        x{book?.quantity}
                      </span>{" "}
                    </h1>
                    <h2 className="text-sm">&#8377;{book?.price}</h2>
                  </div>

                  <div>
                    <p className="text-sm text-gray-700">{book?.author}</p>
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between p-1 pb-2 pt-3">
                <h1 className="text-md font-semibold">Total : </h1>
                <h2 className="text-sm font-semibold">&#8377;{subTotal}</h2>
              </div>
            </div>

            <div>
              <h1 className="text-lg font-semibold mb-4">Payment Method</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="payOnline"
                    name="paymentMethod"
                    value="payOnline"
                    checked={paymentMethod === "payOnline"}
                    onChange={handlePaymentMethodChange}
                  />
                  <label htmlFor="payOnline" className="ml-2">
                    Pay Online
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="cashOnDelivery"
                    name="paymentMethod"
                    value="cashOnDelivery"
                    checked={paymentMethod === "cashOnDelivery"}
                    onChange={handlePaymentMethodChange}
                  />
                  <label htmlFor="cashOnDelivery" className="ml-2">
                    Cash on Delivery
                  </label>
                </div>
              </div>
            </div>

            <Button className="py-2 w-full" text="Continue" loading={loading} />
          </div>
        </form>
      </Container>
    </>
  );
};

export default Checkout;
