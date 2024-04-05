'use client'
import { useDispatch, useSelector } from "react-redux"
import Container from "../components/Container"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import Link from "next/link"
import Button from "../components/Button"
import { BsCart } from "react-icons/bs"
import './checkout.css'
import service from "../appwrite/service"

const Checkout = () => {

    const { cartItems } = useSelector((state => state.cart))
    const userData = useSelector(state => state.auth.userData)
    const router = useRouter()
    const [loading,setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('payOnline');


    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const subTotal = useMemo(() => {
        return cartItems.reduce((total, val) => total + val.price, 0)
    }, [cartItems])


    if (cartItems.length === 0 || userData === null) router.push("/")
    const [selectedAddress, setSelectedAddress] = useState(userData?.address ? userData.address[0] : null);
   
   

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            userId: userData?.UserId,
            collectionId: userData?.$id,
            name: userData?.name || '',
            phone: userData?.phone || '',
            email: userData?.email || '',
            address: userData?.address,
            paymentMethod:"",
            price:"",
            bookId:"",
            payment:"pending",
            status:"IN_TRANSIT",
        },
    });

    const handleAddressChange = (address) => {
        setSelectedAddress(address);
    };

    const onSubmit = async (data) => {


        data.address = selectedAddress;
        data.paymentMethod = paymentMethod;
        
        try {
            setLoading(true)
            if (paymentMethod === 'payOnline') {

            } else if (paymentMethod === 'cashOnDelivery') {
               
                for (const book of cartItems) {
                    const newData = { ...data };
                    newData.price = book.price;
                    newData.bookId = book.Id;
                    newData.quantity = book.quantity;
                    newData.bookQuantity = book.bookQuantity;
                    newData.availability= book.availability;
                    await service.createOrder(newData);
                    await service.updateBookQuantity(newData)
                }
                 setLoading(false)
                 router.replace('/successOrder');
            }
        } catch (error) {
            console.log('Error:', error);
        }
        finally{
            setLoading(false)
        }
        
    }

    return (
        <Container className=" max-w-screen-xl py-5 mb-10">
           
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-screen-lg mt-5 py-2 mx-auto flex md:flex-row flex-col justify-between gap-5">
        
                <div className="space-y-8 flex-[0.5] mx-auto md:w-full w-full">
                    <div>
                        <h1 className="text-2xl font-bold">Shipping</h1>
                    </div>
                    <div className="max-w-md">
                        <div className="flex flex-col space-y-5 ">

                            <div className=' space-y-2 text-sm'>
                                <label htmlFor="name" className="block text-md font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    {...register('name', { required: true })}
                                    className="mt-1 p-2 outline-black border rounded-sm border-gray-300 w-full"
                                />
                                {errors.name?.type === "required" && (
                                    <p role="alert" className='text-sm text-red-800 font-light'>Full Name is required</p>
                                )}
                            </div>

                            <div className=' space-y-2 text-sm'>
                                <label htmlFor="phone" className="block text-md font-medium text-gray-700">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    {...register('phone', {
                                        required: "Phone Number is required.",
                                        pattern: {
                                            value: /^\d{10}$/,
                                            message: 'Phone Number should be 10 digits',
                                        },
                                    },
                                    )}

                                    className="mt-1 p-2 outline-black border rounded-sm border-gray-300 w-full"
                                />
                                {errors.phone && (
                                    <p role="alert" className='text-sm text-red-800 font-light'>{errors.phone.message}</p>
                                )}
                            </div>

                            <div className='space-y-2 text-sm'>
                                <label htmlFor="email" className="block text-md font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    defaultValue={userData?.email}
                                    className="mt-1 p-2 text-gray-800 border outline-none rounded-sm border-gray-300 w-full"
                                    disabled
                                />
                                <p className="text-xs text-gray-500">You cannot change your email.</p>
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="address"
                                    className="block text-md font-medium text-gray-700"
                                >
                                    Select Address
                                </label>
                                {userData?.address && userData.address.map((address, index) => (
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
                                        <label htmlFor={`address_${index}`} className="text-sm">{address}</label>
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
                            <h1 className="text-sm font-medium flex items-center justify-start gap-2"> <BsCart className="text-lg" /> {cartItems.length} item(s) in Cart</h1>
                            <Link href='/cart' className="text-sm font-semibold underline underline-offset-2">
                                Edit Cart
                            </Link>
                        </div>
                        {
                            cartItems?.map(book => (
                                <div key={book?.Id} className="border-b-2 p-1 pb-2 space-y-1 mb-4">

                                    <div className="flex items-center gap-3 justify-between">
                                        <h1 className="text-md text-gray-800 font-semibold">{book?.bookName}<span className="font-medium text-sm"> x{book?.quantity}</span> </h1>
                                        <h2 className="text-sm">&#8377;{book?.price}</h2>
                                    </div>

                                    
                                    <div>
                                        <p className="text-sm text-gray-700">{book?.author}</p>
                                    </div>

                                </div>
                            ))

                        }

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
                                    checked={paymentMethod === 'payOnline'}
                                    onChange={handlePaymentMethodChange}
                                />
                                <label htmlFor="payOnline" className="ml-2">Pay Online</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="cashOnDelivery"
                                    name="paymentMethod"
                                    value="cashOnDelivery"
                                    checked={paymentMethod === 'cashOnDelivery'}
                                    onChange={handlePaymentMethodChange}
                                />
                                <label htmlFor="cashOnDelivery" className="ml-2">Cash on Delivery</label>
                            </div>

                        </div>
                    </div>
                    
                    <Button className="py-2 w-full" text='Continue' loading={loading}/>

                </div>

            </form>
        </Container>
    )
}

export default Checkout
