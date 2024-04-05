'use client'
import service from "@/app/appwrite/service";
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
  console.log(OrderList)

  return (
    selectedLink === 2 &&
   
    <div>
     
    </div>
  )
}

export default Orders
