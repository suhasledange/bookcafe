'use client'
import { useEffect, useState, useMemo, useCallback } from "react";
import HomeSlider from "./components/HomeSlider/HomeSlider";
import Slider from "./components/Slider";
import service from "./appwrite/service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

  const [books, setBooks] = useState([]);
  const [loading,setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    try {
      const { documents } = await service.getBooks();
      setBooks(documents);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data from the server:", error);
      toast.error("Error fetching data from the server. Please try again later.");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredBooks = useMemo(() => {
    return {
      SelfHelp: books.filter(b => b?.genre.includes('Self Help')),
      NonFiction: books.filter(b => b?.genre.includes('NonFiction')),
      Business: books.filter(b => b?.genre.includes('Business')),
    };
  }, [books]);

  return (
    <>
      <HomeSlider />
      <ToastContainer position="top-center" />
      <Slider loading={loading} books={filteredBooks.SelfHelp} title="Self Help" />
      <Slider loading={loading} books={filteredBooks.NonFiction} title="Non-Fiction" />
      <Slider loading={loading} books={filteredBooks.Business} title="Business" />
    </>
  );
}
