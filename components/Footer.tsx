"use client";
import { FiPhone } from "react-icons/fi";
import Link from "next/link";
import React from "react";
import SocialMediaIcons from "./SocialIcons";
import { FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <div className="p-4 mt-2  bg-indigo-900">
      {/* define grid system */}
      <div className="w-4/5 border-b-[1.2px] pb-4 border-b-slate-500 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* first part */}
        <div>
          <h1 className="text-[25px] uppercase font-semiboldmb-4  text-white pb-4">
            Economic Project
          </h1>
          <p className="text-sm opacity-60 m-auto  text-white">
            Kurdistan Instituition for Stategic Studies and Scientific Research
            Building No. 10, Alley 60 Gullabax 335 Shorsh St. , Opposite Shoresh
            Hospital Sulaimani Kurdistan Region, Iraq
          </p>
          <div className="mt-4 p-2">
            <SocialMediaIcons />
          </div>
        </div>
        {/* second Part */}
        <div className="lg:mx-auto">
          <h1 className="footer_title  text-white">Quick linkst</h1>

          <div className="w-28 h-1.5 bg-gradient-to-r from-indigo-400 to-indigo-900 rounded-full "></div>

          <Link href="/">
            <p className="footer_link pt-2">Home</p>
          </Link>
          <Link href="/videos">
            <p className="footer_link">Videos</p>{" "}
          </Link>
          <Link href="/voices">
            {" "}
            <p className="footer_link">Voices</p>
          </Link>
          <Link href="/texts">
            {" "}
            <p className="footer_link">Texts</p>
          </Link>
        </div>

        {/* third Part */}
        <div className="lg:mx-auto">
          <h1 className="footer_title">Ministry Links</h1>

          <div className="w-28 h-1.5 bg-gradient-to-r from-indigo-400 to-indigo-900 rounded-full "></div>

          <Link href="https://gov.krd/mohe-en/">
            <p className="footer_link pt-2">MHE Website</p>
          </Link>
          <Link href="https://kissr.edu.krd/">
            <p className="footer_link">KISSR website</p>{" "}
          </Link>
        </div>
        {/* forth Part */}
        <div className="lg:mx-auto">
          <h1 className="footer_title">Contacts </h1>
          <div className="w-28 h-1.5 bg-gradient-to-r from-indigo-400 to-indigo-900 rounded-full mb-2"></div>
          <div>
            <p className="text-white text-[15px] opacity-90 mb-4 w-fit ">
              Contact us:
            </p>
            <div className="text-white text-[15px] opacity-90 w-fit  hover:text-orange-300 flex gap-2">
              <FiPhone size={20} color="white" />

              <span
                className="text-white text-[15px] opacity-90 mb-4 w-fit hover:text-orange-300 hover:underline cursor-pointer"
                onClick={() => (window.location.href = "tel:+9641234567890")}
              >
                +964 123 456 7890
              </span>
            </div>

            <div className="flex gap-2">
              <FiMail size={20} color="white" />
              <span
                className="text-white text-[15px] opacity-90 mb-4 w-fit hover:text-orange-300  hover:underline cursor-pointer"
                onClick={() =>
                  (window.location.href = "mailto:economic.team@kissr.edu.iq")
                }
              >
                economic.team@kissr.edu.iq
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* copyright */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-6 w-3/4 mx-auto">
        <p className="text-sm text-white opacity-60 pb-4 m-4">
          @ Copyright Economic Project 2025
        </p>
      </div>
    </div>
  );
};

export default Footer;
