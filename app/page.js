'use client'
import { useEffect, useState, useMemo } from "react";
import 'react-toastify/dist/ReactToastify.css';
import service from "./appwrite/service";
import { ToastContainer, toast } from "react-toastify";
import Slider from "./components/Slider";
import HomeSlider from "./components/HomeSlider/HomeSlider";

export default function Home() {

  const [books, setBooks] = useState([]);

  const fetchData = async () => {
    try {
      const { documents } = await service.getBooks();
      setBooks(documents);
    } catch (error) {
      console.error("Error fetching data from the server:", error);
      toast.error("Error fetching data from the server. Please try again later.");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const filteredBooks = useMemo(() => {
    return {
      SelfHelp: books?.filter(b => b?.genre.includes('Self Help')),
      NonFiction: books?.filter(b => b?.genre.includes('NonFiction')),
      Business: books?.filter(b => b?.genre.includes('Business')),
    };
  }, [books]);

  return (
    <>
      <HomeSlider />
      <ToastContainer position="top-center" />
      <Slider books={filteredBooks.SelfHelp} title="Self Help" />
      <Slider books={filteredBooks.NonFiction} title="Non-Fiction" />
      <Slider books={filteredBooks.Business} title="Business" />
    </>
  );
}
