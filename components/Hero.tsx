"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Data } from "@/typing";
import Image from "next/image"; // Add this import

type Props = {
  data: Data[];
};

const Hero = ({ data }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Fixed: Use useCallback to memoize the function
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  }, [data.length]); // Add data.length as dependency

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  }, [data.length]); // Add data.length as dependency

  // ✅ Fixed: Added nextSlide to dependencies
  useEffect(() => {
    if (!data || data.length === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [data, nextSlide]); // Added nextSlide dependency

  if (!data || data.length === 0) {
    return <div className="text-center py-20">No data available</div>;
  }

  const currentItem = data[currentIndex];

  return (
    <div className="min-h-[calc(100vh-12vh-10vh)] flex flex-grow items-center justify-center w-full flex-col pb-6 pt-4 relative">
      {" "}
      {/* Added relative positioning */}
      <div className="w-4/5 mx-auto grid items-center grid-cols-1 lg:grid-cols-2 gap-12 py-2 transition-all duration-500">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl text-sky-700 font-bold">
            {currentItem.title}
          </h1>
          <p className="text-lg text-gray-700 mt-4">{currentItem.desc}</p>
        </div>

        <div>
          {/* ✅ Fixed: Replace img with Next.js Image component */}
          <Image
            className="mt-4 rounded-lg shadow-lg w-full"
            src={currentItem.src}
            alt={currentItem.title}
            width={600} // Add appropriate width
            height={400} // Add appropriate height
            priority // Optional: for important images
          />
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full"
      >
        &#10095;
      </button>
    </div>
  );
};

export default Hero;
