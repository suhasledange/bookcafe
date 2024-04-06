'use client'
import service from "@/app/appwrite/service";
import Button from "@/app/components/Button";
import OrderItem from "@/app/components/OrderItem";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSelector } from "react-redux"


const Orders = ({ selectedLink }) => {

  const userData = useSelector(state => state.auth.userData)
  
  const [cancel, setCancel] = useState(false);
  const [extend, setExtend] = useState(false);


  const [OrderList, setOrderList] = useState();
  const [Loading, setLoading] = useState(false)
  const [sortBox,setSortBox] = useState(false);
  const [sortBy, setSortBy] = useState("dateAsc");
  
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      let ordersResponse = await service.getOrders(userData.UserId);
      let orders = Array.from(ordersResponse.documents);
      switch (sortBy) {
        case "dateDesc":
          orders = orders.sort((a, b) => new Date(a.DateOfOrder) - new Date(b.DateOfOrder));
          break;
        case "dateAsc":
          orders = orders.sort((a, b) => new Date(b.DateOfOrder) - new Date(a.DateOfOrder));
          break;
        case "delivered":
          orders = orders.filter(order => order.status === "DELIVERED");
          break;
        case "inTransit":
          orders = orders.filter(order => order.status === "IN_TRANSIT");
          break;
        case "cancelled":
          orders = orders.filter(order => order.status === "Cancelled");
          break;
        
      }
      setOrderList(orders);
      console.log(orders)
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data from the server:", error);
      setLoading(false);
    }
  }, [cancel,extend,sortBy])

  useEffect(() => {
    setLoading(true)
    fetchData();
  }, [fetchData,cancel,extend,sortBy]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const options = [
    {id:1,value:"dateAsc",text:"Sort by Date (Asc)"},
    {id:2,value:"dateDesc",text:"Sort by Date (Desc)"},
    {id:3,value:"delivered",text:"Delivered"},
    {id:4,value:"inTransit",text:"IN_TRANSIT"},
    {id:5,value:"cancelled",text:"Cancelled"},
  ]


  return (
    selectedLink === 2 &&
   <div>

    <div className="mb-2 py-2 px-1 flex items-end relative">

        <div className="flex flex-1 text-lg items-center justify-between py-1" >
             
              <h1 className="text-black/[0.7] text-md md:text-lg font-bold tracking-wider ">
                Your Orders
              </h1>
              
          <select
           value={sortBy}
           onChange={handleSortChange}
            className="p-2 z-50 bg-black text-white hover:bg-gray-800 duration-200 cursor-pointer hover:text-white border outline-none md:text-md text-sm border-gray-300 rounded-sm "
          >
            {options.map(option => (
              <option className="bg-black/[0.6]  hover:text-purple-700" key={option.id} value={option.value}>{option.text}</option>
            ))}

          </select>
           
        </div>
       
    </div>

    <div>
     
      {
        OrderList && OrderList.length > 0 ?
        OrderList?.map(b => (
          <OrderItem setExtend={setExtend} setCancel={setCancel} key={b.$id} Id={b.$id} bookId={b.bookId} payment={b.payment} paymentMethod={b.paymentMethod} price={b.price} quantity = {b.quantity} status={b.status} DateOfOrder={b.DateOfOrder} DeliveredDate={b.DeliveredDate} DueDate = {b.DueDate}
          />
        )):(
          <div className="w-full flex items-center flex-col justify-center h-screen -translate-y-20">

            <h1 className="mb-5 text-gray-700">Nothing to show</h1>
            
            <div className="w-72 h-72 mb-4">
            <Image alt="X" src="/order.svg" width={500} height={500} style={{width:"100%", height:"100%", objectFit:"cover"}}/>
            </div>
            
            <h1 className="mb-2 text-xl font-semibold">Explore Some Books</h1>
            <Link href="/book">
                <Button text="Go to Store"/>
            </Link>

          </div>
        )
      }
    </div>
   </div>


  )
}

export default Orders
