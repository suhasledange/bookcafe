'use client'
import service from "@/app/appwrite/service";
import Button from "@/app/components/Button";
import OrderItem from "@/app/components/OrderItem";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux"


const Orders = ({ selectedLink }) => {

  const userData = useSelector(state => state.auth.userData)
  const [cancel, setCancel] = useState(false);
  const [extend, setExtend] = useState(false);

  const [cancelLoading,setCancelLoading] =useState(false);
  const [extendLoading,setExtendLoading] =useState(false);


  const [OrderList, setOrderList] = useState();
  const [Loading, setLoading] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      const { documents } = await service.getOrders(userData.UserId)
      setOrderList(documents)
      setLoading(false);
      setCancelLoading(false);
      setExtendLoading(false);
    } catch (error) {
      console.error("Error fetching data from the server:", error);
      setLoading(false);
    }
  }, [cancel,extend])

  useEffect(() => {
    setLoading(true)
    fetchData();
  }, [fetchData,cancel,extend]);


  return (
    selectedLink === 2 &&
   
    <div>
     
      {
        OrderList && OrderList.length > 0 ?
        OrderList?.map(b => (
          <OrderItem setExtend={setExtend} extendLoading={extendLoading} setExtendLoading={setExtendLoading} setCancelLoading={setCancelLoading} cancelLoading={cancelLoading} setCancel={setCancel} key={b.$id} Id={b.$id} bookId={b.bookId} payment={b.payment} paymentMethod={b.paymentMethod} price={b.price} quantity = {b.quantity} status={b.status} DateOfOrder={b.DateOfOrder} DeliveredDate={b.DeliveredDate} DueDate = {b.DueDate}
          />
        )):(
          <div className="w-full flex items-center flex-col justify-center h-screen -translate-y-20">

            <h1 className="mb-5 text-gray-700">Nothing to show</h1>
            
            <div className="w-72 h-72 mb-4">
            <Image src="/order.svg" width={500} height={500} style={{width:"100%", height:"100%", objectFit:"cover"}}/>
            </div>
            
            <h1 className="mb-2 text-xl font-semibold">Explore Some Books</h1>
            <Link href="/book">
                <Button text="Go to Store"/>
            </Link>

          </div>
        )
      }
    </div>

  )
}

export default Orders
