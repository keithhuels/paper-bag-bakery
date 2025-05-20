"use client";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./logo.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import HamburgerMenu from "../../hamburger-menu/hamburger-menu.component";
import { NAV_ITEMS } from "../../constants";
import Image from "next/image";

const NavBar = ({ session }: { session: Session | null }): JSX.Element => {
  const router = useRouter();
  const verifyingEmail = useSearchParams().get("token");

  const useMediaQuery = (width: number) => {
    const [targetReached, setTargetReached] = useState(false);

    const updateTarget = useCallback((e: MediaQueryListEvent) => {
      if (e.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    }, []);

    useEffect(() => {
      const media = window.matchMedia(`(max-width: ${width}px)`);
      let usingDeprecatedListener = false;
      if (media.addEventListener) {
        media.addEventListener("change", updateTarget);
      } else {
        usingDeprecatedListener = true;
        media.addListener(updateTarget);
      }
      if (media.matches) {
        setTargetReached(true);
      }
      return () =>
        usingDeprecatedListener
          ? media.removeListener(updateTarget)
          : media.removeEventListener("change", updateTarget);
    });
    return targetReached;
  };

  const handleLogout = () => {
    signOut();
  };

  const isBreakpoint = useMediaQuery(768);
  return (
    <>
      <div
        className="w-full h-40 border-t-2 border-b-2 border-brand-dark sticky top-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/banner.png')",
        }}
      >
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            {!isBreakpoint ? (
              <div>
                <ul className=" text-3xl font-bold text-hidden md:flex gap-x-4 text-brand-light">
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item}
                      href={!session && item === 'Order'
                        ? '/login'

                        : `${item.split(" ")[0].toLowerCase()}`}
                      className="focus:underline  hover:font-bold focus:shadow-md focus:text-brand-selected focus:text-brand-bread focus:font-bold m-4"
                    >
                      {item}
                    </Link>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="ml-5">
                < HamburgerMenu session={session} items={NAV_ITEMS} />
              </div>
            )}
            <Logo />
            <div className="m-40">
              {!isBreakpoint &&
                (session ? (
                  <div className="w-200">
                    <div>
                      <p className="text-sm">You're signed in as:</p>
                      <p className="text-brand-bread"> {session.user?.email}</p>
                    </div>
                    <div>
                      <button
                        onClick={handleLogout}
                        className=" hover:font-bold focus:shadow-xl focus:text-brand-selected focus:font-bold"
                      >
                        <FontAwesomeIcon icon={faRightFromBracket} /> Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link href="/login">
                    <button className="focus:underline text-3xl text-brand-light font-bold hover:font-bold focus:shadow-md focus:text-brand-selected focus:font-bold">
                      <FontAwesomeIcon icon={faRightToBracket} /> Login
                    </button>
                  </Link>
                ))}
              {isBreakpoint && session && (
                <>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  <button
                    onClick={handleLogout}
                    className="hover:font-bold focus:shadow-md focus:text-brand-bread focus:font-bold"
                  >
                    Logout
                  </button>
                </>
              )}
              {isBreakpoint && !session && (
                <Link href="/login">
                  <FontAwesomeIcon className="mr-1" icon={faRightToBracket} />
                  <button className="text-lg text-brand-light hover:font-bold focus:shadow-md focus:text-brand-bread focus:font-bold">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
