"use client";

import { RootState } from "../store/store";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react"; // ✅ Add useEffect
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "@/store/authSlice";
// import { useLogoutMutation } from "@/services/api";

const NavBar = () => {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector(
    (state: RootState) => state.auth.isAdminLoggedIn
  );
  const [isClient, setIsClient] = useState(false); // ✅ Add client check
  // const [logout] = useLogoutMutation();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = async () => {
    // try {
    //   await logout().unwrap();
    //   if (typeof window !== "undefined") {
    //     localStorage.removeItem("token"); // ✅ Use "token"
    //   }
    //   dispatch(logoutSuccess());
    //   alert("Logged out successfully!");
    // } catch (error) {
    //   console.error("Logout failed:", error);
    // }

    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }

    // Clear Redux auth state
    dispatch(logoutSuccess());

    // Optional: Show success message
    alert("Logged out successfully!");
  };

  // ✅ Don't render auth section until client-side
  if (!isClient) {
    return (
      <div className="h-[12vh] sticky top-0 shadow-md bg-indigo-900">
        <div className="flex flex-row gap-4 items-center justify-between w-auto md:w-4/5 mx-auto h-auto">
          {/* Loading state for navbar */}
        </div>
      </div>
    );
  }

  return (
    <div className="h-[12vh] sticky top-0 shadow-md bg-indigo-900">
      <div className="flex flex-row gap-4 items-center justify-between w-auto md:w-4/5 mx-auto h-auto">
        <Link href="/">
          <Image src="/images/logo.png" alt="log" width={100} height={100} />
        </Link>
        <div className="flex flex-row items-center gap-6 justify-start w-auto md:w-4/5 mx-auto h-auto text-cyan-50">
          <Link href="/home" className="hover:text-orange-300">
            Home
          </Link>
          <Link href="/videos" className="hover:text-orange-300">
            Videos
          </Link>
          <Link href="/voices" className="hover:text-orange-300">
            Voices
          </Link>
          <Link href="/texts" className="hover:text-orange-300">
            Texts
          </Link>
          <Link href="/uploadfiles" className="hover:text-orange-300">
            Upload Files
          </Link>
          <Link href="/fileList" className="hover:text-orange-300">
            File List
          </Link>
        </div>
        <div>
          {isAdminLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 hover:text-gray-200"
            >
              <span>Logout</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          ) : (
            <Link
              href="/login"
              className="flex items-center space-x-2 hover:text-gray-200"
            >
              <span>Login</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
