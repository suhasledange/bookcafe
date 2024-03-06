'use client'
import { useEffect, useState, useMemo } from "react";
import HomeSlider from "./components/HomeSlider/HomeSlider";
import Slider from "./components/Slider";
import service from "./appwrite/service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

  const [books, setBooks] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await service.getBooks();
      const { documents } = res;
      setBooks(documents);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data from the server:", error);
      toast.error("Error fetching data from the server. Please try again later.");
      setLoading(false);
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
