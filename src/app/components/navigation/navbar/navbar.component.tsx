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

const NavBar = ({ session }: { session: Session | null }): JSX.Element => {
  const router = useRouter();
  const verifyingEmail = useSearchParams().get("token");

  useEffect(() => {
    if (!session && !verifyingEmail) {
      router.push("/login");
    }
    if (session) {
      router.push("/dashboard");
    }
  }, [session]);

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
      <div className="w-full h-32 border-t-2 border-b-2 border-zinc-400 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            {!isBreakpoint ? (
              <div>
                <ul className="hidden md:flex gap-x-6 text-black">
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item}
                      href={session ? `${item.toLowerCase()}` : "/login"}
                      className="hover:font-bold focus:shadow-md focus:text-blue-800 focus:font-bold"
                    >
                      {item}
                    </Link>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="ml-5">
                <HamburgerMenu session={session} items={NAV_ITEMS} />
              </div>
            )}
            <Logo />
            <div className="mr-5">
              {!isBreakpoint &&
                (session ? (
                  <div className="w-200">
                    <div>
                      <p className="text-sm">You're signed in as:</p>
                      <p className="text-blue-500 "> {session.user?.email}</p>
                    </div>
                    <div>
                      <button
                        onClick={handleLogout}
                        className=" hover:font-bold focus:shadow-md focus:text-blue-800 focus:font-bold"
                      >
                        <FontAwesomeIcon icon={faRightFromBracket} /> Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link href="/login">
                    <button className="text-lg hover:font-bold focus:shadow-md focus:text-blue-800 focus:font-bold">
                      <FontAwesomeIcon icon={faRightToBracket} /> Login
                    </button>
                  </Link>
                ))}
              {isBreakpoint && session && (
                <>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  <button
                    onClick={handleLogout}
                    className="hover:font-bold focus:shadow-md focus:text-blue-800 focus:font-bold"
                  >
                    Logout
                  </button>
                </>
              )}
              {isBreakpoint && !session && (
                <Link href="/login">
                  <FontAwesomeIcon className="mr-1" icon={faRightToBracket} />
                  <button className="text-lg hover:font-bold focus:shadow-md focus:text-blue-800 focus:font-bold">
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
