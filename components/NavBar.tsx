import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <div className="h-[12vh] sticky top-0 shadow-md bg-slate-20">
      <div className="flex flex-row gap-4 items-center justify-between w-auto md:w-4/5 mx-auto h-auto">
        <Link href="/">
          <Image src="/images/logo.png" alt="log" width={100} height={100} />
        </Link>
        <div className="flex flex-row  items-center gap-6 justify-start w-auto md:w-4/5 mx-auto h-auto">
          <Link href="/about">About</Link>
          <Link href="/vedios">Videos</Link>
          <Link href="/voices">Voices</Link>
          <Link href="/texts">Texts</Link>
        </div>
        <div>Login</div>
      </div>
    </div>
  );
};

export default NavBar;
