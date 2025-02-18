"use client";

import React, { useEffect, useState } from "react";
import { Data } from "@/typing";

type Props = {
  data: Data[];
};

const Hero = ({ data }: Props) => {
  if (!data || data.length === 0) return null;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex: number) => (prevIndex + 1) % data.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex: number) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };
  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const currentItem = data[currentIndex]; // Get current item

  return (
    <div className="min-h-[calc(100vh-12vh-10vh)] flex flex-grow items-center justify-center w-full flex-col pb-6 pt-4">
      {/* Slider Content */}
      <div className="w-4/5 mx-auto grid items-center grid-cols-1 lg:grid-cols-2 gap-12 py-2 transition-all duration-500">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl text-sky-700 font-bold uppercase">
            {currentItem.title}
          </h1>
          <p className="text-lg text-gray-700 mt-4">{currentItem.desc}</p>
        </div>
        <div>
          <img
            className="mt-4 rounded-lg shadow-lg w-full"
            src={currentItem.src}
            alt={currentItem.title}
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full"
      >
        &#10094; {/* Left Arrow */}
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full"
      >
        &#10095; {/* Right Arrow */}
      </button>
    </div>

    // <div className="min-h-[calc(100vh-12vh-10vh)] flex flex-grow items-center justify-center w-full flex-col py-12">
    // {/* text  */}
    // <div className="w-4/5 mx-auto grid items-center grid-cols-1 lg:grid-cols-2 gap-12 py-12">
    //   {data.map((item) => (
    //     <div key={item.id}>
    //       <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-black font-bold uppercase">
    //         {item.title}
    //       </h1>
    //       <p className="text-lg text-gray-700 mt-4">{item.desc}</p>
    //       <img
    //         className="mt-6 rounded-lg shadow-lg w-full max-[500px]:"
    //         src={item.src}
    //         alt={item.title}
    //       />
    //     </div>
    //   ))}
    //   <div></div>
    // </div>
    // </div>
  );
};

export default Hero;
