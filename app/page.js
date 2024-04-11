'use client'
import { useEffect, useState, useCallback } from "react";
import HomeSlider from "./components/HomeSlider/HomeSlider";
import Slider from "./components/Slider";
import service from "./appwrite/service";

export default function Home() {

  const [loading, setLoading] = useState(true);

  const [books, setBooks] = useState({
    SelfHelp: [],
    NonFiction: [],
    Business: [],
  });


  const getBookbygenre = useCallback(async () => {
    try {
     
      const [selfHelpBooks, nonFictionBooks, businessBooks] = await Promise.all([
        service.getBooksByGenre('Self Help'),
        service.getBooksByGenre('NonFiction'),
        service.getBooksByGenre('Business'),
      ]);
      
      setBooks({
        SelfHelp: selfHelpBooks,
        NonFiction: nonFictionBooks,
        Business: businessBooks,
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data from the server:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getBookbygenre();
  }, [getBookbygenre]);

  return (
    <>
      <HomeSlider />
      <Slider loading={loading} books={books.SelfHelp} title="Self Help" />
      <Slider loading={loading} books={books.NonFiction} title="Non-Fiction" />
      <Slider loading={loading} books={books.Business} title="Business" />
    </>
  );
}
