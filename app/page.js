'use client'
import { useEffect, useState } from "react";
import HomeSlider from "./components/HomeSlider/HomeSlider";
import Slider from "./components/Slider";
import service from "./appwrite/service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Home() {

  const [books, setBooks] = useState();
  const [loading, setLoading] = useState(true);
  const [SelfHelp,setSelfHelp] = useState();
  const [NonFiction,setNonFiction] = useState();
  const [Business,setBusiness] = useState();

  useEffect(() => {

    const fetchData = async () => {
      try {

     const res = await service.getBooks();
        const { documents } = res;
        setBooks(documents);
  
        const SelfHelp = documents?.filter(b => b?.genre.includes('Self Help'))
        setSelfHelp(SelfHelp)
  
  
        const NonFiction = documents?.filter(b => b?.genre.includes('NonFiction'))
        setNonFiction(NonFiction)
  
        const Business = documents?.filter(b => b?.genre.includes('Business'))
        setBusiness(Business)
  
        setLoading(false);
      } catch (error) {

        console.error("Error fetching data from the server:", error);
        toast.error("Error fetching data from the server. Please try again later.");
        setLoading(false);

      }
    }
    fetchData();
  }, [])

  return (
    <>
      <HomeSlider />
    <ToastContainer />
      <Slider books={SelfHelp} title="Self Help" />
      <Slider books={NonFiction} title="Non-Fiction" />
      <Slider books={Business} title="Business" />
    </>
  );
}
