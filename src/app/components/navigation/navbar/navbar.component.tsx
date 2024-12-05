import React from "react";
import Link from "next/link";
import Logo from "./logo.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

const NavBar = ({
  toggle,
  session,
}: {
  toggle: () => void;
  session: Session | null;
}): JSX.Element => {
  const handleLogout = () => {
    signOut();
  };
  return (
    <>
      <div className="w-full h-20 bg-zinc-200 border-2 border-zinc-400 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            {!!session && (
              <div>
                <p className="text-sm">
                  You're signed in as {session.user?.email}
                </p>
                <button
                  onClick={handleLogout}
                  className="hover:font-bold focus:shadow-md focus:text-blue-800 focus:font-bold"
                >
                  <FontAwesomeIcon icon={faRightFromBracket} /> Logout
                </button>
              </div>
            )}
            {!session && (
              <Link href="/login">
                <button className="hover:font-bold focus:shadow-md focus:text-blue-800 focus:font-bold">
                  <FontAwesomeIcon icon={faRightToBracket} /> Login
                </button>
              </Link>
            )}
            <ul className="hidden md:flex gap-x-6 text-black">
              <li>
                <Link href={session ? "/blog" : "/login"}>
                  <button className="hover:font-bold focus:shadow-md focus:text-blue-800 focus:font-bold">
                    Blog
                  </button>
                </Link>
              </li>
              <li>
                <Link href={session ? "/services" : "/login"}>
                  <button className="hover:font-bold focus:shadow-lg focus:text-blue-800 focus:font-bold">
                    Services
                  </button>
                </Link>
              </li>
              <li>
                <Link href={session ? "/contact" : "/login"}>
                  <button className="hover:font-bold focus:shadow-lg focus:text-blue-800 focus:font-bold">
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
