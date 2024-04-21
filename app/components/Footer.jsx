"use client";
import Link from "next/link";
import Container from "./Container";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
const Footer = () => {
  const links = [
    { id: 1, logo: <FaFacebookF size={20} />, link: "https://facebook.com" },
    { id: 3, logo: <FaTwitter size={20} />, link: "https://twitter.com" },
    { id: 2, logo: <FaYoutube size={20} />, link: "https://youtube.com" },
    { id: 4, logo: <FaInstagram size={20} />, link: "https://instagram.com" },
  ];

  const info = [
    { id: 1, text: "About Us", link: "/about" },
    { id: 2, text: "Contact Us", link: "/contact" },
    { id: 3, text: "Privacy Policy", link: "/privacy" },
    { id: 4, text: "Terms And Conditions", link: "/terms" },
    { id: 5, text: "Refund And Cancellation Policy", link: "cancellation" },
  ];

  const more = [
    { id: 1, text: "Browse Books", link: "/book" },
    { id: 2, text: "My Account", link: "/profile" },
    { id: 3, text: "Renting Guide", link: "/guide" },
    { id: 4, text: "Feedback", link: "/feedback" },
    // { id: 5, text: "FAQ", link: "/faq" },
  ];

  return (
    <footer className="bg-black/[0.96] text-white pt-14 mt-16">
      <Container className="flex flex-col md:flex-row max-w-screen-xl px-3 md:px-0">
        <div className="flex w-full gap-10 flex-col md:flex-row justify-between">
         
          <div className="flex flex-col gap-3">
            <Link href="/" className="text-xl text-white font-bold">
              BookCafe
            </Link>
            <div className="text-sm font-light text-white/[0.5]">
              <p>Welcome to BookCafe!</p>
              <p className=" w-[70%]">
                Your go-to destination for all your book rental needs.
              </p>
            </div>
            <div className="mb-5 text-white/[0.5]">
              <p> bookcafe30@gmail.com </p>
            </div>

            <div className="flex gap-4 justify-start">
              {links.map((l) => (
                <Link
                  key={l.id}
                  href={l.link}
                  className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer"
                >
                  {l.logo}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex gap-16 flex-wrap">
            <div className="flex flex-col gap-3">
              <div className="font-oswald font-medium uppercase text-sm">
                Out Information
              </div>

              {info.map((i) => (
                <Link
                  href={i.link}
                  key={i.id}
                  className="text-sm text-white/[0.5] hover:text-white cursor-pointer"
                >
                  {i.text}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <div className="font-oswald font-medium uppercase text-sm">
                More
              </div>

              {more.map((m) => (
                <Link
                  href={m.link}
                  key={m.id}
                  className="text-sm text-white/[0.5] hover:text-white cursor-pointer"
                >
                  {m.text}
                </Link>
              ))}
            </div>

            <div className="flex md:flex-col flex-row gap-10">
              <div className=" flex flex-col gap-3">
                <div className="font-oswald font-medium uppercase text-sm">
                  Contact Us
                </div>
                <div className="text-white/[0.5]">
                  123 BookCafe St, City, Country
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="font-oswald font-medium uppercase text-sm">
                  Join Us
                </div>

                <div className="text-white/[0.5] flex items-center gap-3 flex-wrap">
                  Join Us on{" "}
                  <Link href="/">
                    {" "}
                    <IoLogoWhatsapp className="text-2xl hover:text-white duration-200" />{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container className="mt-10 py-1 bg-black">
        <div className="text-[12px] text-white/[0.5] hover:text-white/[0.7] duration-200 cursor-pointer text-center">
          © 2024 BookCafe, Inc. All Rights Reserved
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
