"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

const Logo = () => {
  //update the size of the logo when the size of the screen changes
  const [width, setWidth] = useState(0);

  const updateWidth = () => {
    const newWidth = window.innerWidth;
    setWidth(newWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    updateWidth();
  }, []);

  // change between the logo and the button when the user scrolls
  const [showButton, setShowButton] = useState(false);

  const changeNavButton = () => {
    if (window.scrollY >= 400 && window.innerWidth < 768) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavButton);
  }, []);

  return (
    <>
      <div className="block w-50">
        <Link
          href="/"
          style={{
            display: showButton ? "none" : "block",
            height: "auto",
            width: "auto",
          }}
        >
          <Image
            src="/images/paper-bag-bakery-favicon.png"
            priority
            alt="Logo"
            width="100"
            height="0"
            className="flex relative w-full h-auto"
          />
        </Link>
        <div
          title="Home"
          className="visible"
          style={{
            display: showButton ? "block" : "none",
          }}
        ></div>
      </div>
    </>
  );
};

export default Logo;
