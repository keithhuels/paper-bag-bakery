import React from "react";
import Link from "next/link";
import Logo from "./Logo";

const NavBar = ({ toggle }: { toggle: () => void }): JSX.Element => {
  return (
    <>
      <div className="w-full h-20 border-t-2 border-b-2 border-indigo-200 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <Link href="/login">
              <button className="h-10 rounded-lg border-2 font-bold bg-indigo-400 hover:bg-indigo-200 px-5 focus:bg-indigo-300">
                Sign In
              </button>
            </Link>
            <ul className="hidden md:flex gap-x-6 text-black">
              <li>
                <Link href="/blog">
                  <button className="hover:font-bold focus:shadow-md focus:text-indigo-800">
                    Blog
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <button className="hover:font-bold focus:shadow-lg focus:text-indigo-800">
                    Services
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <button className="hover:font-bold focus:shadow-lg focus:text-indigo-800">
                    Contact
                  </button>
                </Link>
              </li>
            </ul>
            <Logo />
          </div>
        </div>
      </div>
      <button
        type="button"
        className="inline-flex items-center md:hidden"
        onClick={toggle}
      >
        {/* Menu icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
        >
          <path fill="#fff" d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z" />
        </svg>
      </button>
    </>
  );
};

export default NavBar;
