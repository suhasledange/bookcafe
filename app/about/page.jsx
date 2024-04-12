import React from "react";
import Container from "../components/Container";
import Image from "next/image";

const About = () => {
  return (
    <Container className="max-w-screen-xl py-10">
      <div className="sm:flex items-center max-w-screen-xl">
        <div className="sm:w-1/2 p-10">
          <div className="md:w-[80%] md:h-[80%] mx-auto object-center text-center">
            <Image
              style={{ objectFit: "contain", width: "100%", height: "100%" }}
              width={500}
              height={500}
              src="/about.svg"
              alt="Company Logo"
            />
          </div>
        </div>
        <div className="sm:w-1/2 p-5">
          <div className="text">
            <h2 className="my-4 font-bold text-3xl sm:text-4xl">
              About Us
             
            </h2>

            <p className="text-gray-700 text-justify">
              Welcome to Book Cafe, At Book Cafe, we're passionate about
              fostering a dynamic learning environment for readers through the
              power of literature and community. Founded by a group of
              enthusiastic college students, our venture emerged from a shared
              love for books and a desire to create a space where readers can
              explore, connect, and grow. Our mission is to provide readers with
              a cozy haven where they can indulge in their love for reading,
              exchange ideas, and engage in meaningful conversations. We believe
              in the transformative power of books to inspire, educate, and
              entertain, and we're committed to curating a diverse selection of
              titles that cater to the varied interests and academic pursuits of
              our readers community
            </p>
          </div>
        </div>
            
      </div>
    </Container>
  );
};

export default About;
