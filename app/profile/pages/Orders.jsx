'use client'
import service from "@/app/appwrite/service";
import OrderItem from "@/app/components/OrderItem";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux"


const Orders = ({ selectedLink }) => {

  const userData = useSelector(state => state.auth.userData)


  const [OrderList, setOrderList] = useState();
  const [Loading, setLoading] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      const { documents } = await service.getOrders(userData.UserId)
      setOrderList(documents)
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data from the server:", error);
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    fetchData();
  }, [fetchData]);

  return (
    selectedLink === 2 &&
   
    <div>
     
      {
        OrderList?.map(b => (
          <OrderItem key={b.$id} bookId={b.bookId} payment={b.payment} paymentMethod={b.paymentMethod} price={b.price} quantity = {b.quantity} status={b.status} DateOfOrder={b.DateOfOrder} DeliveredDate={b.DeliveredDate}
          />
        ))
      }
    </div>
  )
}

export default Orders
