import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="pt-2  bg-indigo-900">
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
          <p className="text-base mt-6 text-white opacity-80">social media</p>
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
            <p className="text-white text-[15px] opacity-90 mb-4 w-fit cursor-pointer">
              Contact us:
            </p>
            <p className="text-white text-[15px] opacity-90 mb-4 w-fit cursor-pointer">
              📞 +964 (0)748 010 4674{" "}
            </p>
            <p className="text-white text-[15px] opacity-90 mb-4 w-fit cursor-pointer">
              📧 economic.team@kissr.edu.iq
            </p>
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
